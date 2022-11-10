import { MissingParamsError } from "../../errors"
import { Validation } from "./validation-helper"

export class RequiredFieldsValidation implements Validation {
  private readonly fieldName: string

  constructor (fieldName: string) {
    this.fieldName = fieldName
  }

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamsError(this.fieldName)
    }
  }
}
