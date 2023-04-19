import { EmailValidator } from "@/presentation/protocols/email-validator";
import { makeLoginValidation } from "./login-validation-factory";
import { Validation } from "@/presentation/protocols/validation-helper";
import { RequiredFieldsValidation } from "@/validation/validators/required-fields-validation";
import { EmailValidation } from "@/validation/validators/email-validation";
import { ValidationComposite } from "@/validation/validators/validation-composite";

jest.mock("@/validation/validators/validation-composite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};
describe("LoginValidation factory", () => {
  test("should call ValidationComposite with all validators", () => {
    makeLoginValidation();
    const validations: Validation[] = [];
    for (const field of ["email", "password"]) {
      validations.push(new RequiredFieldsValidation(field));
    }
    validations.push(new EmailValidation("email", makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
