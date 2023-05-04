import { RequiredFieldsValidation } from "@/validation/validators/required-fields-validation";
import { ValidationComposite } from "@/validation/validators/validation-composite";
import { Validation } from "@/presentation/protocols/validation-helper";
import { makeAddSurveyValidation } from "../survey/add-survey-validation-factory";

jest.mock("@/validation/validators/validation-composite");

describe("AddSurveyValidation factory", () => {
  test("should call ValidationComposite with all validators", () => {
    makeAddSurveyValidation();
    const validations: Validation[] = [];
    for (const field of ["question", "answers"]) {
      validations.push(new RequiredFieldsValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
