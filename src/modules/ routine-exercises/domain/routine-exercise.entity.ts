import { BaseEntity } from "src/shared/domain/base.entity";
import { ValidatorFactory } from "src/shared/domain/validators/validator";

interface RoutineExerciseConstructorProps {
  id?: number;
  routineId: number;
  exerciseId: number;
  order: number;
  createdAt?: Date;
}

export class RoutineExerciseEntity extends BaseEntity {

  private _routineId: number;
  private _exerciseId: number;
  private _order: number;

  constructor({
    id,
    routineId,
    exerciseId,
    order,
    createdAt
  }: RoutineExerciseConstructorProps) {
    super(id, createdAt)
    this.routineId = routineId;
    this.exerciseId = exerciseId;
    this.order = order;
  }

  get routineId() {
    return this._routineId;
  }

  set routineId(routineId: number) {
    ValidatorFactory.number('routineId', routineId, 'RoutineExerciseEntity')
      .isInteger()
      .isPositive();
    this._routineId = routineId;
  }

  get exerciseId() {
    return this._exerciseId;
  }

  set exerciseId(exerciseId: number) {
    ValidatorFactory.number('exerciseId', exerciseId, 'RoutineExerciseEntity')
      .isInteger()
      .isPositive();
    this._exerciseId = exerciseId;
  }

  get order() {
    return this._order;
  }

  set order(order: number) {
    ValidatorFactory.number('order', order, 'RoutineExerciseEntity')
      .isInteger()
      .isPositive();
    this._order = order;
  }
}