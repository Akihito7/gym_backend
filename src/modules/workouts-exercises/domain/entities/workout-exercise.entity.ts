import { BaseEntity } from "src/shared/domain/base.entity";
import { ValidatorFactory } from "src/shared/domain/validators/validator";
import { WorkoutSetConstructorProps, WorkoutSetEntity } from "./workout-set.entity";

interface WorkoutExerciseConstructorProps {
  id?: number;
  workoutId: number;
  exerciseId: number;
  orderExercise: number;
  workoutSets?: WorkoutSetEntity[]
  createdAt?: Date;
}

export class WorkoutExerciseEntity extends BaseEntity {
  private _workoutId: number;
  private _exerciseId: number;
  private _orderExercise: number;
  private _workoutSets?: WorkoutSetEntity[]

  constructor({ id, workoutId, exerciseId, orderExercise, workoutSets, createdAt }: WorkoutExerciseConstructorProps) {
    super(id, createdAt);
    this.workoutId = workoutId;
    this.exerciseId = exerciseId;
    this.orderExercise = orderExercise;
    this._workoutSets = workoutSets ?? [];
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

  addWorkoutExerciseSet(reps: number, weight: number, orderSet: number) {
    const workoutSet = new WorkoutSetEntity({ workoutExerciseId: this.id, reps, weight, orderSet });
    this._workoutSets.push(workoutSet);
  }

  removeWorkoutExerciseSet(setId: number) {
    this._workoutSets = this._workoutSets.filter(({ id }) => id !== setId);
  }
}