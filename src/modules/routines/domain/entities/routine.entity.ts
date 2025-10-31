import { BaseEntity } from "src/shared/domain/base.entity";
import { NameRequiredError } from "src/shared/domain/errors/required.error";
import { NameTooShortError } from "src/shared/domain/errors/too-short-error";

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
    this.validateName(name);
    this._name = name.trim();
  }

  private validateName(name: string) {

    const trimmedName = name?.trim();

    if (!trimmedName) {
      throw new NameRequiredError('Você precisa dar um nome para sua rotina.', 'Routine')
    }

    if (trimmedName.length < 3) {
      throw new NameTooShortError('O nome da sua rotina precisa ter no mínimo 3 caracteres.', 'Routine');
    }
  }
}
