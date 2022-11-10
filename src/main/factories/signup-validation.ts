import { CompareFieldsValidation } from "../../presentation/helpers/validators/compare-field-validation"
import { RequiredFieldsValidation } from "../../presentation/helpers/validators/required-fields-validation"
import { ValidationComposite } from "../../presentation/helpers/validators/validation-composite"
import { Validation } from "../../presentation/helpers/validators/validation-helper"

export const makeSignupValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldsValidation(field))
    validations.push(new CompareFieldsValidation("password", "passwordConfirmation"))
  }

  return new ValidationComposite(validations)
}
