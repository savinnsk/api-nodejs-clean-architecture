import { InvalidParamsError } from "../../presentation/errors";
import { CompareFieldsValidation } from "./compare-field-validation";

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation("field", "fieldToCompare");
};

describe("CompareField Validation", () => {
  test("Should return a InvalidParamsError if validator throws", () => {
    const sut = makeSut();
    const error = sut.validate({
      field: "any_value",
      fieldToCompare: "wrong_compare",
    });
    expect(error).toEqual(new InvalidParamsError("fieldToCompare"));
  });

  test("should not return if validation success", () => {
    const sut = makeSut();
    const error = sut.validate({
      field: "any_value",
      fieldToCompare: "any_value",
    });
    expect(error).toBeFalsy();
  });
});
