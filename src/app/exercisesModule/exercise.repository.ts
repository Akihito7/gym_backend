import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/config/db";

@Injectable()
export class ExerciseRepository {

  //ter uma conexao com o banco;
  getManyExercises() {
    return dbConnection`SELECT * FROM exercises`
  }
}