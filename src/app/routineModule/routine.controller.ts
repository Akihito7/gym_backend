import { Body, Controller, Delete, Get, HttpCode, Param, Post, Req, UseGuards } from "@nestjs/common";
import { RoutineService } from "./routine.service";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateRoutineDTO } from "./dtos/create-routine.DTO";


@Controller("routines")
export class RoutineController {
  constructor(private readonly routineService: RoutineService) { }
  @Get()
  @UseGuards(AuthGuard)
  async getManyRoutinesByUser(@Req() req) {
    const userId = req.user.id;
    return this.routineService.getManyRoutinesByUser(userId)
  }

  @Post()
  @UseGuards(AuthGuard)
  async createRoutine(@Req() req , @Body() body : CreateRoutineDTO){
    return this.routineService.createRoutine(body, req.user.id)
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