import { InvalidParamsError } from "../../errors";
import { Validation } from "../../protocols/validation-helper";

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate(input: any): Error {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamsError(this.fieldToCompareName);
    }
  }
}
