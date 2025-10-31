export class InvalidError extends Error {
  constructor(message: string, name?: string) {
    super(message)
    this.name = `${name}InvalidError`
  }
}