export class RoutineNameTooShortError extends Error {
  constructor() {
    super("O nome da sua rotina precisa ter no mínimo 3 caracteres.");
    this.name = "RoutineNameTooShortError";
  }
}