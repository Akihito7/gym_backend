import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/config/db";
import { CreateTrainingSessionDTO } from "./dtos/create-training-session.DTO";

@Injectable()
export class TrainingSessionService {
  async getHistoryByUser(userId: string) {
    return dbConnection`
    SELECT r.name, w.id, w.duration, w.created_at FROM workouts w 
    JOIN routines r ON r.id  = w.routine_id
    WHERE w.user_id = ${userId}
    ORDER BY w.created_at DESC`
  }

  async createTrainingSession(data: CreateTrainingSessionDTO) {
    return dbConnection`INSERT INTO workouts (user_id, routine_id, duration)
    VALUES (${data.userId}, ${data.routineId}, ${data.duration})
    RETURNING id
    `
  }

  async insertExercisesInTrainingSession(data: any) {
    return dbConnection`INSERT INTO workouts_exercises 
    (workout_id, exercise_id, "order")
    VALUES (${data.workoutId}, ${data.exerciseId}, ${data.order} )
    RETURNING id
    `
  }

  async insertIntoSetsInTrainingSession(data: any) {
    await dbConnection`INSERT INTO workout_sets 
    (workout_exercise_id, reps, weight, "order")
    VALUES (${data.workoutExerciseId}, ${data.reps}, ${data.weight}, ${data.order} )
    `
  }

  async getDetailsHistoryTraining(trainingId: number) {
    return dbConnection`
   SELECT 
    w.duration,
    (SELECT COUNT(*) FROM workouts_exercises ws WHERE ws.workout_id = ${trainingId}) AS total_exercises,
    (SELECT COUNT(*) 
     FROM workout_sets ws
     LEFT JOIN workouts_exercises we ON ws.workout_exercise_id = we.id
     WHERE we.workout_id = ${trainingId}
    ) AS total_sets,
    ARRAY_AGG(
        JSON_BUILD_OBJECT(
        'exercise_id', e.id,
            'name', e.name,
            'img_url', e.img_url,
            'muscle_group', e.muscle_group,
            'series', (
                SELECT ARRAY_AGG(
                    JSON_BUILD_OBJECT(
                        'id', ws.id,
                        'order', ws."order",
                        'weight', ws.weight,
                        'reps', ws.reps
                    )
                    ORDER BY ws."order"  -- Ordenando as séries por "order"
                )
                FROM workout_sets ws
                WHERE ws.workout_exercise_id = we.id
            )
        )
    ) AS exercises
FROM workouts w
LEFT JOIN workouts_exercises we ON we.workout_id = w.id
LEFT JOIN exercises e ON e.id = we.exercise_id
WHERE w.id = ${trainingId}
GROUP BY w.duration;
     `
  }
}