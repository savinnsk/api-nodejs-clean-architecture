import { RequiredFieldsValidation } from "@/validation/validators/required-fields-validation";
import { CompareFieldsValidation } from "@/validation/validators/compare-field-validation";
import { ValidationComposite } from "@/validation/validators/validation-composite";
import { EmailValidation } from "@/validation/validators/email-validation";
import { EmailValidator } from "@/presentation/protocols/email-validator";
import { Validation } from "@/presentation/protocols/validation-helper";
import { makeSignupValidation } from "./signup-validation-factory";

jest.mock("@/validation/validators/validation-composite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};
describe("SignupValidation factory", () => {
  test("should call ValidationComposite with all validators", () => {
    makeSignupValidation();
    const validations: Validation[] = [];
    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      validations.push(new RequiredFieldsValidation(field));
    }
    validations.push(
      new CompareFieldsValidation("password", "passwordConfirmation")
    );
    validations.push(new EmailValidation("email", makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
