import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/config/db";
import { CreateTrainingSessionDTO } from "./dtos/create-training-session.DTO";

@Injectable()
export class TrainingSessionService {
  async getHistoryByUser(userId: string) {
    return dbConnection`SELECT * FROM workouts WHERE user_id = ${userId}`
  }

  async createTrainingSession(data: CreateTrainingSessionDTO) {
    return dbConnection`INSERT INTO workouts (user_id, routine_id, duration)
    VALUES (${data.userId}, ${data.routineId}, ${data.duration})
    `
  }
}