import { MissingParamsError } from "../../errors"
import { ValidationComposite } from "./validation-composite"
import { Validation } from "./validation-helper"

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new ValidationComposite([validationStub])
  return {
    sut,
    validationStub
  }
}

describe("Validation Composite", () => {
  test("Should return an error if any validation fails", () => {})
  const { sut, validationStub } = makeSut()
  jest.spyOn(validationStub, "validate").mockReturnValueOnce(new MissingParamsError("field"))
  const error = sut.validate({ field: "any_value" })
  expect(error).toEqual(new MissingParamsError("field"))
})
