import { Controller, Delete, Get, HttpCode, Param, Req, UseGuards } from "@nestjs/common";
import { RoutineService } from "./routine.service";
import { AuthGuard } from "src/guards/auth.guard";


@Controller("routines")
export class RoutineController {
  constructor(private readonly routineService: RoutineService) { }
  @Get()
  @UseGuards(AuthGuard)
  async getManyRoutinesByUser(@Req() req) {
    const userId = req.user.id;
    return this.routineService.getManyRoutinesByUser(userId)
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