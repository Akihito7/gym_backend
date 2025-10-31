export class IsNotInteger extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IsNotInteger'
  }
}