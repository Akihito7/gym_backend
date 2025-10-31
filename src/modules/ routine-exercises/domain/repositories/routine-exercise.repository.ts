import { RoutineExerciseEntity } from "../entities/routine-exercise.entity"

export interface RoutineExerciseRepository {
  save(routineId: number, exerciseId: number): Promise<RoutineExerciseEntity>
  deleteById(id: number): Promise<void>
}