import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/config/db";

@Injectable()
export class TrainingSessionService {
  async getHistoryByUser(userId : string) {
    return dbConnection`SELECT * FROM workouts WHERE user_id = ${userId}`
  }
}