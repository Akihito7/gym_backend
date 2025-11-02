import { BaseEntity } from "src/shared/domain/base.entity";
import { ValidatorFactory } from "src/shared/domain/validators/validator";

interface UserConstructorProps {
  id?: number;
  username: string;
  email: string;
  password: string;
  urlPhoto: string;
  createdAt?: Date;
}

export class UserEntity extends BaseEntity {
  private _username: string;
  private _email: string;
  private _password: string;
  private _urlPhoto: string;

  constructor({ id, username, email, password, urlPhoto, createdAt }: UserConstructorProps) {
    super(id, createdAt);
    this.username = username;
    this.email = email;
    this.password = password;
    this.urlPhoto = urlPhoto;
  }

  get username() {
    return this._username;
  }

  set username(username: string) {
    ValidatorFactory
      .string('username', username, 'UserEntity')
      .required()
      .minLength(3)
      .maxLength(52);
    this._username = username
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    ValidatorFactory
      .string('email', email, 'UserEntity')
      .required()
      .isEmail();
    this._email = email;
  }

  get password() {
    return this._password;
  }

  set password(password: string) {
    ValidatorFactory
      .string('password', password, 'UserEntity')
      .required()
      .minLength(8)
      .maxLength(512);
    this._password = password;
  }

  get urlPhoto() {
    return this._urlPhoto;
  }

  set urlPhoto(urlPhoto: string) {
    ValidatorFactory
      .string('urlPhoto', urlPhoto, 'UserEntity')
      .required()
      .isUrl()
    this._urlPhoto = urlPhoto;
  }
}