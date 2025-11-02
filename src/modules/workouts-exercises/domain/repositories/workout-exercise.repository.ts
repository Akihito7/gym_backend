import { WorkoutExerciseEntity } from "../entities/workout-exercise.entity";

export interface WorkoutExerciseRepository {
  findById(workoutExerciseId: number): Promise<WorkoutExerciseEntity | null>
  save(workoutExercise: WorkoutExerciseEntity): Promise<void>
  update(workoutExercise: WorkoutExerciseEntity): Promise<void>
}