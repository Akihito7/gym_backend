import { BaseEntity } from "src/shared/domain/base.entity";
import { Validator } from "src/shared/domain/validators/validator";

export class RoutineEntity extends BaseEntity {
  private _name: string;

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
    Validator.field('name', name, 'RoutineEntity')
      .required()
      .minLength(3);
    this._name = name.trim();
  }

}
