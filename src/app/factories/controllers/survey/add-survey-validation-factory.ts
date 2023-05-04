import { ValidationComposite } from "@/validation/validators/validation-composite";
import { Validation } from "../../../../presentation/protocols/validation-helper";
import { RequiredFieldsValidation } from "@/validation/validators/required-fields-validation";

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ["question", "answers"]) {
    validations.push(new RequiredFieldsValidation(field));
  }

  return new ValidationComposite(validations);
};
