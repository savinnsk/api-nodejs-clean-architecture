import { MissingParamsError } from "../../presentation/errors";
import { RequiredFieldsValidation } from "./required-fields-validation";

const makeSut = (): RequiredFieldsValidation => {
  return new RequiredFieldsValidation("field");
};

describe("RequiredField Validation", () => {
  test("should return a MissingParamError if validator throws", () => {
    const sut = makeSut();
    const error = sut.validate({ name: "any_name" });
    expect(error).toEqual(new MissingParamsError("field"));
  });

  test("should not return if validation success", () => {
    const sut = makeSut();
    const error = sut.validate({ field: "field" });
    expect(error).toBeFalsy();
  });
});
