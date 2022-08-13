export class MissingParamsError extends Error {
  constructor (paramName: string) {
    // inheritance needs super
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
