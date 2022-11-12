import { CompareFieldsValidation } from "../../../presentation/helpers/validators/compare-field-validation"
import { EmailValidation } from "../../../presentation/helpers/validators/email-validation"
import { RequiredFieldsValidation } from "../../../presentation/helpers/validators/required-fields-validation"
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite"
import { Validation } from "../../../presentation/protocols/validation-helper"
import { EmailValidator } from "../../../presentation/protocols/email-validator"
import { makeSignupValidation } from "./signup-validation"

jest.mock("../../../presentation/helpers/validators/validation-composite")

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}
describe("SignupValidation factory", () => {
  test("should call ValidationComposite with all validators", () => {
    makeSignupValidation()
    const validations: Validation[] = []
    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(new CompareFieldsValidation("password", "passwordConfirmation"))
    validations.push(new EmailValidation("email", makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
