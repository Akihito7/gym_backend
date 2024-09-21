import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/config/db";

@Injectable()
export class RoutineService {
  async getManyRoutinesByUser(userId: string) {
    await dbConnection`SELECT * FROM routines WHERE user_id = ${userId}`
  }

  async deleteRoutine(routineId: string) {
    await dbConnection`DELETE FROM routines WHERE id = ${routineId}`
  }

  async removeExerciseFromRoutine(exerciseId: string) {
    await dbConnection`DELETE FROM routine_exercises WHERE id = ${exerciseId}`
  }
}