import { InvalidError } from "../errors/invalid.error";
import { RequiredError } from "../errors/required.error";
import { TooLongError } from "../errors/too-long-error";
import { TooShortError } from "../errors/too-short-error";

export class Validator {
  private _fieldName: string;
  private _fieldValue: string;
  private _classToValidate: string;

  constructor(fieldName: string, fieldValue: string, classToValidate: string) {
    this._fieldName = fieldName;
    this._fieldValue = fieldValue;
    this._classToValidate = classToValidate;
  }

  static field(fieldName: string, fieldValue: string, classToValidate: string) {
    return new Validator(fieldName, fieldValue, classToValidate);
  }

  required() {
    const trimmedValue = this._fieldValue.trim();
    if (!trimmedValue)
      throw new RequiredError(
        `O campo : ${this._fieldName} não pode estar vazio.`,
        this._classToValidate
      );
    return this;
  }

  minLength(minLength: number) {
    if (this._fieldValue.length < minLength)
      throw new TooShortError(
        `O campo : ${this._fieldName} precisa ter no mínimo ${minLength} caracteres.`,
        this._classToValidate
      );
    return this;
  }

  maxLength(maxLength: number) {
    if (this._fieldValue.length > maxLength)
      throw new TooLongError(
        `O campo : ${this._fieldName} precisa ter no máximo ${maxLength} caracteres.`,
        this._classToValidate
      );
    return this;
  }

  isEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this._fieldValue))
      throw new InvalidError(
        `O campo : ${this._fieldName} precisa ser um email válido.`,
        this._classToValidate
      );
    return this;
  }

  isUrl() {
    try {
      new URL(this._fieldValue);
    } catch {
      throw new InvalidError(
        `O campo : ${this._fieldName} precisa ser uma URL válida.`,
        this._classToValidate
      );
    }
    return this;
  }
}
