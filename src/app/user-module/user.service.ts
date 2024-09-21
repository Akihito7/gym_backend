import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/config/db";

@Injectable()
export class UserService {

  async getMetricsUser(userId: string) {
    return  dbConnection`
SELECT 'total_training_sessions' AS category, COUNT(*) AS total
FROM workouts
WHERE user_id = ${userId}
UNION
SELECT 'total_exercises' AS category, COUNT(*) AS total
FROM workouts_exercises we
WHERE we.workout_id in (select id from workouts w where w.user_id = ${userId} )
UNION
SELECT 'total_sets' AS category, COUNT(*) AS total
from workout_sets ws
WHERE ws.id in (SELECT ws.id FROM workouts w
JOIN workouts_exercises we on we.workout_id = w.id
JOIN workout_sets ws on ws.workout_exercise_id = we.id)`
  }
}