import { BaseEntity } from "src/shared/domain/base.entity";
import { ValidatorFactory } from "src/shared/domain/validators/validator";

interface WorkoutConstructorProps {
  id?: number;
  userId: number;
  routineId: number;
  duration: string;
  createdAt?: Date;
}

export class WorkoutEntity extends BaseEntity {
  private _userId: number;
  private _routineId: number;
  private _duration: string;

  constructor({ id, userId, routineId, duration, createdAt }: WorkoutConstructorProps) {
    super(id, createdAt);
    this.userId = userId;
    this.routineId = routineId;
    this.duration = duration;
  }

  get userId() {
    return this._userId;
  }

  set userId(userId: number) {
    ValidatorFactory
      .number('userId', userId, 'WorkoutEntity')
      .isInteger()
      .isPositive();
    this._userId = userId;
  }

  get routineId() {
    return this._routineId;
  }

  set routineId(routineId: number) {
    ValidatorFactory
      .number('routineId', routineId, 'WorkoutEntity')
      .isInteger()
      .isPositive();
    this._userId = routineId;
  }

  get duration() {
    return this._duration;
  }

  set duration(duration: string) {
    ValidatorFactory
      .string('duration', duration, 'WorkoutEntity')
      .required()
      .isValidDuration();
    this._duration = duration;
  }

}