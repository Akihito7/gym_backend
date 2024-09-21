import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/config/db";

@Injectable()
export class ExerciseService {
  async getManyExercises() {
    return dbConnection`SELECT * FROM exercises`
  }
}