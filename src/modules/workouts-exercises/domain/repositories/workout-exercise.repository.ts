import { WorkoutExerciseEntity } from "../entities/workout-exercise.entity";

export interface WorkoutExerciseRepository {
  save(workoutExercise: WorkoutExerciseEntity): Promise<void>
}