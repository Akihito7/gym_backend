import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/config/db";

@Injectable()
export class UserService {
  async getUser(userId: string) {
    const [user] = await dbConnection`SELECT * FROM users WHERE id = ${userId}`;
    return user
  }

  async getMetricsUser(userId: string) {
    return dbConnection`
      SELECT 'total_training_sessions' AS category, COUNT(*) AS total
      FROM workouts
      WHERE user_id = ${userId}
      UNION
      SELECT 'total_exercises' AS category, COUNT(*) AS total
      FROM workouts_exercises we
      WHERE we.workout_id IN (SELECT id FROM workouts w WHERE w.user_id = ${userId})
      UNION
      SELECT 'total_sets' AS category, COUNT(*) AS total
      FROM workout_sets ws
      WHERE ws.id IN (
        SELECT ws.id FROM workouts w
        JOIN workouts_exercises we ON we.workout_id = w.id
        JOIN workout_sets ws ON ws.workout_exercise_id = we.id
        WHERE w.user_id = ${userId}
      )
    `;
  }
}
