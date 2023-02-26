import { EmailValidation } from "../../../presentation/helpers/validators/email-validation"
import { RequiredFieldsValidation } from "../../../presentation/helpers/validators/required-fields-validation"
import { ValidationComposite } from "../../../presentation/helpers/validators/validation-composite"
import { Validation } from "../../../presentation/protocols/validation-helper"
import { EmailValidatorAdapter } from "../../../utils/email-validator-adapter"

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ["email", "password"]) {
    validations.push(new RequiredFieldsValidation(field))
  }
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
