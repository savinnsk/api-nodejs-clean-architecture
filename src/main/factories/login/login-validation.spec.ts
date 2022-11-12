import { EmailValidation } from "../../../presentation/helpers/validators/email-validation"
import { RequiredFieldsValidation } from "../../../presentation/helpers/validators/required-fields-validation"
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite"
import { Validation } from "../../../presentation/protocols/validation-helper"
import { EmailValidator } from "../../../presentation/protocols/email-validator"
import { makeLoginValidation } from "./login-validation"

jest.mock("../../../presentation/helpers/validators/validation-composite")

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}
describe("LoginValidation factory", () => {
  test("should call ValidationComposite with all validators", () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ["email", "password"]) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(new EmailValidation("email", makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
