export class ServerError extends Error {
  constructor () {
    // inheritance needs super
    super(`Internal Server Error`)
    this.name = 'ServerError'
  }
}
