import { InvalidError } from "../errors/invalid.error";
import { IsNotInteger } from "../errors/not-intenger.error";
import { NotPositiveError } from "../errors/not-positive.error";
import { RequiredError } from "../errors/required.error";
import { TooLongError } from "../errors/too-long.error";
import { TooShortError } from "../errors/too-short.error";


export abstract class BaseValidator<T> {
  protected _fieldName: string;
  protected _fieldValue: T;
  protected _classToValidate: string;

  constructor(fieldName: string, fieldValue: T, classToValidate: string) {
    this._fieldName = fieldName;
    this._fieldValue = fieldValue;
    this._classToValidate = classToValidate;
  }

  get fieldName() {
    return this._fieldName;
  }

  get fieldValue() {
    return this._fieldValue;
  }

  get classToValidate() {
    return this._classToValidate
  }

}

export class StringValidator extends BaseValidator<string> {

  static build(fieldName: string, fieldValue: string, classToValidate: string) {
    return new StringValidator(fieldName, fieldValue, classToValidate);
  }

  required() {
    const trimmedValue = this.fieldValue.trim();
    if (!trimmedValue)
      throw new RequiredError(
        `O campo : ${this.fieldName} não pode estar vazio.`,
        this.classToValidate
      );
    return this;
  }

  minLength(minLength: number) {
    if (this.fieldValue.length < minLength)
      throw new TooShortError(
        `O campo : ${this.fieldName} precisa ter no mínimo ${minLength} caracteres.`,
        this.classToValidate
      );
    return this;
  }

  maxLength(maxLength: number) {
    if (this.fieldValue.length > maxLength)
      throw new TooLongError(
        `O campo : ${this.fieldName} precisa ter no máximo ${maxLength} caracteres.`,
        this.classToValidate
      );
    return this;
  }

  isEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.fieldValue))
      throw new InvalidError(
        `O campo : ${this.fieldName} precisa ser um email válido.`,
        this.classToValidate
      );
    return this;
  }

  isUrl() {
    try {
      new URL(this.fieldValue);
    } catch {
      throw new InvalidError(
        `O campo : ${this.fieldName} precisa ser uma URL válida.`,
        this.classToValidate
      );
    }
    return this;
  }

  isValidDuration() {
    const durationRegex = /^(\d{2,}:)?(\d{2}:)?[0-5]\d$/;
    if (!durationRegex.test(this.fieldValue)) {
      throw new TooLongError(
        `O campo: ${this.fieldName} precisa estar no formato de duração 'MM:SS' ou 'HH:MM:SS' e ter os segundos entre 00 e 59.`,
        this.classToValidate
      );
    }
  }
}

export class NumberValidator extends BaseValidator<number> {

  static build(fieldName: string, fieldValue: number, classToValidate: string) {
    return new NumberValidator(fieldName, fieldValue, classToValidate)
  }

  isPositive() {
    if (this.fieldValue <= 0)
      throw new NotPositiveError(`O campo ${this.fieldName} precisa ser positivo.`);
    return this;
  }

  isInteger() {
    if (!Number.isInteger(this.fieldValue))
      throw new IsNotInteger(`O campo ${this.fieldName} precisa ser um número inteiro.`);
    return this;
  }

  min(minValue: number) {
    if (this.fieldValue < minValue)
      throw new TooShortError(`O campo ${this.fieldName} precisa ser no mínimo ${minValue}.`);
    return this;
  }

  max(maxValue: number) {
    if (this.fieldValue > maxValue)
      throw new TooLongError(`O campo ${this.fieldName} precisa ser no máximo ${maxValue}.`);
    return this;
  }
}



export class ValidatorFactory {
  static string(fieldName: string, value: string, className: string) {
    return StringValidator.build(fieldName, value, className);
  }

  static number(fieldName: string, value: number, className: string) {
    return NumberValidator.build(fieldName, value, className);
  }
}


