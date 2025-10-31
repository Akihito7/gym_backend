import { ExerciseEntity } from "../entities/exercise.entity";

export interface ExerciseRepository {
  findAll(): Promise<ExerciseEntity[]>
}