import { ValidationComposite } from "@/validation/validators/validation-composite";
import { Validation } from "../../../../presentation/protocols/validation-helper";
import { EmailValidatorAdapter } from "../../../adapters/validators/email-validator-adapter";
import { RequiredFieldsValidation } from "@/validation/validators/required-fields-validation";
import { EmailValidation } from "@/validation/validators/email-validation";

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["email", "password"]) {
    validations.push(new RequiredFieldsValidation(field));
  }
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
