import { RequiredFieldsValidation } from "../../presentation/helpers/validators/required-fields-validation"
import { ValidationComposite } from "../../presentation/helpers/validators/validation-composite"
import { Validation } from "../../presentation/helpers/validators/validation-helper"
import { makeSignupValidation } from "./signup-validation"

jest.mock("../../presentation/helpers/validators/validation-composite")

describe("SignupValidation factory", () => {
  test("should call ValidationComposite with all validators", () => {
    makeSignupValidation()
    const validations: Validation[] = []
    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      validations.push(new RequiredFieldsValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
