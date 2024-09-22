import { Body, Controller, Delete, Get, HttpCode, Param, Post, Req, UseGuards } from "@nestjs/common";
import { RoutineService } from "./routine.service";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateRoutineDTO } from "./dtos/create-routine.DTO";
import { InsertExerciseInRoutineDTO } from "./dtos/insert-exercise-in-routine.DTO";


@Controller("routines")
@UseGuards(AuthGuard)
export class RoutineController {
  constructor(private readonly routineService: RoutineService) { }
  @Get()
  async getManyRoutinesByUser(@Req() req) {
    const userId = req.user.id;
    return this.routineService.getManyRoutinesByUser(userId)
  }

  @Post()
  async createRoutine(@Req() req , @Body() body : CreateRoutineDTO){
    return this.routineService.createRoutine(body, req.user.id)
  }

  @Post("exercise")
  async insertExerciseInRoutine(@Body() body : InsertExerciseInRoutineDTO){
    return this.routineService.insertExerciseInRoutine(body)
  }

  @Delete(":routineId")
  @HttpCode(204)
  async deleteRoutine(@Param("routineId") exerciseId : string){
    return this.routineService.deleteRoutine(exerciseId);
  }

  @Delete("exercise/:exerciseId")
  @HttpCode(204)
  async removeExerciseFromRoutine(@Param("exerciseId") exerciseId : string){
    return this.routineService.removeExerciseFromRoutine(exerciseId);
  }
}