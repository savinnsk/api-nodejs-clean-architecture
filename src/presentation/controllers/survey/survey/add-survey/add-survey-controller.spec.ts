import { HttpRequest } from "@/presentation/protocols";
import { AddSurveyController } from "./add-survey-controller";
import { Validation } from "@/presentation/protocols/validation-helper";

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: "any_question",
    answers: [
      {
        image: "any_image",
        answer: "any_answer",
      },
    ],
  },
});

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null;
    }
  }

  return new ValidationStub();
};

const makeSut = () => {
  const validationStub = makeValidationStub();
  const sut = new AddSurveyController(validationStub);

  return {
    sut,
    validationStub,
  };
};

describe("AddSurvey Controller", () => {
  test("should call Validation with correct values", () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, "validate");
    sut.handle(makeFakeRequest());
    expect(validateSpy).toHaveBeenCalledWith({
      body: {
        question: "any_question",
        answers: [
          {
            image: "any_image",
            answer: "any_answer",
          },
        ],
      },
    });
  });
});
