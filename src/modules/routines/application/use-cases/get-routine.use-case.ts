import { RoutineEntity } from "../../domain/entities/routine.entity";
import { BaseUseCase } from "src/shared/application/use-case";
import { RoutineRepository } from "../../domain/repositories/routine.repository";

export namespace GetRoutineUseCase {

  interface Input {
    userId: number;
  }

  type Output = RoutineEntity[];

  export class UseCase implements BaseUseCase<Input, Output> {

    constructor(private readonly routineRepository: RoutineRepository) { }

    async execute({ userId }: Input): Promise<Output> {

      const routines = await this.routineRepository.findAllByUserId(userId);
      return routines;

    }
  }
}

//ter uma camada de presentation se necessario