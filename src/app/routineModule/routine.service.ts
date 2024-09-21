import { Injectable } from "@nestjs/common";
import { dbConnection } from "src/config/db";

@Injectable()
export class RoutineService {
  async  getManyRoutinesByUser(userId : string){
    return dbConnection`SELECT * FROM routines WHERE user_id = ${userId}`
  }
}