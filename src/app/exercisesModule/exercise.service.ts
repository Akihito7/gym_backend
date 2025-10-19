import { Injectable } from "@nestjs/common";
import { ExerciseRepository } from "./exercise.repository";

@Injectable()
export class ExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) { }
  async getManyExercises() {
    return this.exerciseRepository.getManyExercises()
  }
}