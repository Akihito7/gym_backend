import { BaseEntity } from "src/shared/domain/base.entity";
import { ValidatorFactory } from "src/shared/domain/validators/validator";


interface WorkoutExerciseConstructorProps {
  id?: number;
  workoutId: number;
  exerciseId: number;
  orderExercise: number;
  createdAt?: Date;
}

export class WorkoutExerciseEntity extends BaseEntity {
  private _workoutId: number;
  private _exerciseId: number;
  private _orderExercise: number;

  constructor({ id, workoutId, exerciseId, orderExercise, createdAt }: WorkoutExerciseConstructorProps) {
    super(id, createdAt);
    this.workoutId = workoutId;
    this.exerciseId = exerciseId;
    this.orderExercise = orderExercise;
  }

  get workoutId() {
    return this._workoutId;
  }

  get exerciseId() {
    return this._exerciseId;
  }

  get orderExercise() {
    return this._orderExercise;
  }

  set workoutId(workoutId: number) {
    ValidatorFactory
      .number('workoutId', workoutId, 'WorkoutExerciseEntity')
      .isInteger()
      .isPositive();
    this._workoutId = workoutId;
  }

  set exerciseId(exerciseId: number) {
    ValidatorFactory
      .number('exerciseId', exerciseId, 'WorkoutExerciseEntity')
      .isInteger()
      .isPositive();
    this._exerciseId = exerciseId;
  }

  set orderExercise(orderExercise: number) {
    ValidatorFactory
      .number('orderExercise', orderExercise, 'WorkoutExerciseEntity')
      .isInteger()
      .isPositive();
    this._orderExercise = orderExercise;
  }
}