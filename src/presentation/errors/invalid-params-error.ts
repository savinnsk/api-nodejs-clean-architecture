export class InvalidParamsError extends Error {
  constructor (paramName: string) {
    // inheritance needs super
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
