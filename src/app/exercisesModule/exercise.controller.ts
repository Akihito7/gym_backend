import { Controller, Get, UseGuards } from "@nestjs/common";
import { ExerciseService } from "./exercise.service";
import { AuthGuard } from "src/guards/auth.guard";

@Controller("exercises")
@UseGuards(AuthGuard)
export class ExerciseController {
  constructor(private readonly exerciseService : ExerciseService){}
  @Get()
  async getManyExercises() {
    return this.exerciseService.getManyExercises();
  }
}