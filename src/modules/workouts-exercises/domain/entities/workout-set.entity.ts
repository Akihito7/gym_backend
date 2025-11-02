import { BaseEntity } from "src/shared/domain/base.entity";
import { ValidatorFactory } from "src/shared/domain/validators/validator";


export interface WorkoutSetConstructorProps {
  id?: number;
  workoutExerciseId: number;
  reps: number;
  weight: number;
  orderSet: number;
  createdAt?: Date
}

export class WorkoutSetEntity extends BaseEntity {
  private _workoutExerciseId: number;
  private _reps: number;
  private _weight: number;
  private _orderSet: number;

  constructor({ id, workoutExerciseId, reps, weight, orderSet, createdAt }: WorkoutSetConstructorProps) {
    super(id, createdAt);
    this.workoutExerciseId = workoutExerciseId;
    this.reps = reps;
    this.weight = weight;
    this.orderSet = orderSet;
  }

  get workoutExerciseId() {
    return this._workoutExerciseId;
  }

  set workoutExerciseId(workoutExerciseId: number) {
    ValidatorFactory
      .number('workoutExerciseId', workoutExerciseId, 'WorkoutSetEntity')
      .isInteger()
      .isPositive();
    this._workoutExerciseId = workoutExerciseId;
  }

  get reps() {
    return this._reps;
  }

  set reps(reps: number) {
    ValidatorFactory
      .number('reps', reps, 'WorkoutSetEntity')
      .isInteger()
      .isPositive();
    this._reps = reps;
  }


  get weight() {
    return this._weight;
  }

  set weight(weight: number) {
    ValidatorFactory
      .number('weight', weight, 'WorkoutSetEntity')
      .isInteger()
      .isPositive();
    this._weight = weight;
  }


  get orderSet() {
    return this._orderSet;
  }

  set orderSet(orderSet: number) {
    ValidatorFactory
      .number('orderSet', orderSet, 'WorkoutSetEntity')
      .isInteger()
      .isPositive();
    this._orderSet = orderSet;
  }
}