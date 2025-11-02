import { ExerciseEntity } from "src/modules/exercises/domain/entities/exercise.entity";
import { BaseEntity } from "src/shared/domain/base.entity";
import { ValidatorFactory } from "src/shared/domain/validators/validator";

export class RoutineEntity extends BaseEntity {
  private _name: string;
  private _exercises: ExerciseEntity[];

  constructor(name: string, id?: number, createdAt?: Date, updatedAt?: Date) {
    super(id, createdAt, updatedAt);
    this.setName(name);
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this.setName(name);
  }

  private setName(name: string) {
    ValidatorFactory.string('name', name, 'RoutineEntity')
      .required()
      .minLength(3);
    this._name = name.trim();
  }

  addExercise(exercise: ExerciseEntity) {
    this._exercises.push(exercise)
  }

  removeExercise(exerciseId: number) {
    this._exercises = this._exercises.filter(({ id }) => id !== exerciseId);
  }
}
