import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/config/db";
import { CreateRoutineDTO } from "./dtos/create-routine.DTO";
import { InsertExerciseInRoutineDTO } from "./dtos/insert-exercise-in-routine.DTO";

@Injectable()
export class RoutineService {
  async getManyRoutinesByUser(userId: string) {
    return dbConnection`
SELECT 
  r.*, 
  JSON_AGG(
    JSON_BUILD_OBJECT(
      'exercise_id_in_exercises', re.exercise_id,
      'id', e.id,
      'name', e.name,
      'group', e.muscle_group,
      'gif', e.gif_url,
      'img_url', e.img_url,
      'description', e.description,
      'series', ARRAY[]::text[]  -- Adiciona um array vazio para séries dentro de cada exercício
    )
  ) AS exercises
FROM 
  routines r
LEFT JOIN 
  routine_exercises re ON r.id = re.routine_id
LEFT JOIN 
  exercises e ON re.exercise_id = e.id
WHERE 
  r.is_excluded is not TRUE
  AND r.user_id = ${userId}
  GROUP BY 
  r.id;
`
  }

  async createRoutine(data: CreateRoutineDTO, userId: string) {
    return dbConnection`INSERT INTO routines (user_id, name)
    VALUES (${userId}, ${data.routineName})
    RETURNING id
    `
  }

  async insertExerciseInRoutine(data: InsertExerciseInRoutineDTO) {
    await dbConnection`INSERT INTO routine_exercises (routine_id, exercise_id, "order")
    VALUES (${data.routineId}, ${data.exerciseId}, ${data.order})
    `
  }

  async deleteRoutine(routineId: string) {
    await dbConnection`UPDATE routines SET is_excluded = TRUE where id = ${routineId}`
  }

  async removeExerciseFromRoutine(exerciseId: string) {
    await dbConnection`DELETE FROM routine_exercises WHERE exercise_id = ${exerciseId}`
  }
}