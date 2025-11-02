import { WorkoutEntity } from "../entities/workout.entity";

export interface WorkoutRepository {
  findAllByUser(userId: number): Promise<WorkoutEntity[]>
  findById(workoutId: number): Promise<WorkoutEntity | null>
  save(workout: WorkoutEntity): Promise<void>
}