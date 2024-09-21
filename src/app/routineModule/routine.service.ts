import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/config/db";
import { CreateRoutineDTO } from "./dtos/create-routine.DTO";
import { InsertExerciseInRoutineDTO } from "./dtos/insert-exercise-in-routine.DTO";

@Injectable()
export class RoutineService {
  async getManyRoutinesByUser(userId: string) {
    await dbConnection`SELECT * FROM routines WHERE user_id = ${userId}`
  }

  async createRoutine(data: CreateRoutineDTO, userId: string) {
    await dbConnection`INSERT INTO routines (user_id, name)
    VALUES (${userId}, ${data.routineName})
    `
  }

  async insertExerciseInRoutine(data: InsertExerciseInRoutineDTO) {
    await dbConnection`INSERT INTO routine_exercises (routine_id, exercise_id, "order")
    VALUES (${data.routineId}, ${data.exerciseId}, ${data.order})
    `
  }

  async deleteRoutine(routineId: string) {
    await dbConnection`DELETE FROM routines WHERE id = ${routineId}`
  }

  async removeExerciseFromRoutine(exerciseId: string) {
    await dbConnection`DELETE FROM routine_exercises WHERE id = ${exerciseId}`
  }
}