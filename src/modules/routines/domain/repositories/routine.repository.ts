import { RoutineEntity } from "../entities/routine.entity";

export interface RoutineRepository {
  findAllByUserId(userId: number): Promise<RoutineEntity[]>
  save(routine: RoutineEntity): Promise<void>
  deleteById(routineId: number): Promise<void>
}