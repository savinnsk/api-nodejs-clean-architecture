import { MissingParamsError } from "../../presentation/errors";
import { Validation } from "../../presentation/protocols/validation-helper";

export class RequiredFieldsValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamsError(this.fieldName);
    }
  }
}
