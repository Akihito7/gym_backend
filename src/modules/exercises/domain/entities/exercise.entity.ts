import { BaseEntity } from "src/shared/domain/base.entity";
import { ValidatorFactory } from "src/shared/domain/validators/validator";

interface ExerciseConstructorProps {
  id?: number;
  name: string;
  description: string;
  muscleGroup: string;
  imageUrl: string;
  gifUrl: string;
  createdAt?: Date;
}

export class ExerciseEntity extends BaseEntity {
  private _name: string;
  private _description: string;
  private _muscleGroup: string;
  private _imageUrl: string;
  private _gifUrl: string;

  constructor({ id, name, description, muscleGroup, imageUrl, gifUrl, createdAt }: ExerciseConstructorProps) {
    super(id, createdAt);
    this.name = name;
    this.description = description;
    this.muscleGroup = muscleGroup;
    this.imageUrl = imageUrl;
    this.gifUrl = gifUrl;
  }

  get name(): string { return this._name; }
  get description(): string { return this._description; }
  get muscleGroup(): string { return this._muscleGroup; }
  get imageUrl(): string { return this._imageUrl; }
  get gifUrl(): string { return this._gifUrl; }

  set name(value: string) {
    ValidatorFactory.string('name', value, 'ExerciseEntity').required().minLength(3);
    this._name = value;
  }

  set description(value: string) {
    ValidatorFactory.string('description', value, 'ExerciseEntity').required().minLength(3);
    this._description = value;
  }

  set muscleGroup(value: string) {
    ValidatorFactory.string('muscleGroup', value, 'ExerciseEntity').required().minLength(3);
    this._muscleGroup = value;
  }

  set imageUrl(value: string) {
    ValidatorFactory.string('imageUrl', value, 'ExerciseEntity').required().isUrl()
    this._imageUrl = value;
  }

  set gifUrl(value: string) {
    ValidatorFactory.string('gifUrl', value, 'ExerciseEntity').required().isUrl()
    this._gifUrl = value;
  }
}
