import { BaseUseCase } from "src/shared/application/use-case";
import { WorkoutExerciseRepository } from "../../domain/repositories/workout-exercise.repository";

export namespace AddWorkoutExerciseSetUseCase {

  export interface Input {
    workoutExerciseId: number,
    reps: number,
    weight: number,
    orderSet: number
  }

  export type Output = void;

  export class UseCase implements BaseUseCase<Input, Output> {
    constructor(private readonly workoutExerciseRepository: WorkoutExerciseRepository) { }

    async execute({ workoutExerciseId, reps, weight, orderSet }: Input): Promise<Output> {

      const workoutExercise = await this.workoutExerciseRepository.findById(workoutExerciseId);

      if (!workoutExercise) {
        throw new Error(`Exercício do treino com ID ${workoutExerciseId} não foi encontrado.`);
      }

      workoutExercise.addWorkoutExerciseSet(reps, weight, orderSet);

      await this.workoutExerciseRepository.save(workoutExercise);
    }
  }
}
