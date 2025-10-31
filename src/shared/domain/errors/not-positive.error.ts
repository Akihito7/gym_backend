export class NotPositiveError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotPositiveError'
  }
}