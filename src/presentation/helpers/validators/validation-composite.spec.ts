import { MissingParamsError } from "../../errors"
import { ValidationComposite } from "./validation-composite"
import { Validation } from "./validation-helper"

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return new MissingParamsError("field")
    }
  }
  return new ValidationStub()
}

const makeSut = (): ValidationComposite => {
  const validationStub = makeValidationStub()
  return new ValidationComposite([validationStub])
}

describe("Validation Composite", () => {
  test("Should return an error if any validation fails", () => {})
  const sut = makeSut()
  const error = sut.validate({ field: "any_value" })
  expect(error).toEqual(new MissingParamsError("field"))
})
