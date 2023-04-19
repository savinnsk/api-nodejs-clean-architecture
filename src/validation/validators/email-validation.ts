import { InvalidParamsError } from "../../presentation/errors";
import { EmailValidator } from "../../presentation/protocols/email-validator";
import { Validation } from "../../presentation/protocols/validation-helper";

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate(input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);

    if (!isValid) {
      return new InvalidParamsError(this.fieldName);
    }
  }
}
