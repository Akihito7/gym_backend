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
    `
  }
}