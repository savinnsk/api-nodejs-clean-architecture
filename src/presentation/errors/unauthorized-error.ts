export class Unauthorized extends Error {
  constructor () {
    // inheritance needs super
    super(`Unauthorized`)
    this.name = 'UnauthorizedError'
  }
}
