export class RoutineNameRequiredError extends Error {
  constructor() {
    super("Você precisa dar um nome para sua rotina.");
    this.name = "RoutineNameRequiredError";
  }
}