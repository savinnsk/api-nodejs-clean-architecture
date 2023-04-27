import { ValidationComposite } from "@/validation/validators/validation-composite";
import { Validation } from "@/presentation/protocols/validation-helper";
import { RequiredFieldsValidation } from "@/validation/validators/required-fields-validation";
import { EmailValidation } from "@/validation/validators/email-validation";
import { EmailValidatorAdapter } from "@/app/adapters/validators/email-validator-adapter";

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["email", "password"]) {
    validations.push(new RequiredFieldsValidation(field));
  }
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
