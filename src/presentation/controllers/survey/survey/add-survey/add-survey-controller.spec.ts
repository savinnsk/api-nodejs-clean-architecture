import { HttpRequest } from "@/presentation/protocols";
import { AddSurveyController } from "./add-survey-controller";
import { Validation } from "@/presentation/protocols/validation-helper";
import {
  badRequest,
  serverError,
} from "@/presentation/helpers/http/http-helper";
import { AddSurvey, AddSurveyModel } from "@/domain/usecases/survey/add-survey";
import { ServerError } from "@/presentation/errors";

type SutType = {
  sut: AddSurveyController;
  validationStub: Validation;
  addSurveyStub: AddSurvey;
};

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

const makeAddSurveyStub = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    add(data: AddSurveyModel): Promise<Error | void> {
      return new Promise((resolve) => resolve());
    }
  }

  return new AddSurveyStub();
};

const makeSut = (): SutType => {
  const validationStub = makeValidationStub();
  const addSurveyStub = makeAddSurveyStub();
  const sut = new AddSurveyController(validationStub, addSurveyStub);

  return {
    sut,
    validationStub,
    addSurveyStub,
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

  test("Should returns 400 if Validator returns an error", async () => {
    const { sut, validationStub } = makeSut();

    jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
    const httResponse = await sut.handle(makeFakeRequest());
    expect(httResponse).toEqual(badRequest(new Error()));
  });

  test("should call AddSurvey with correct values", () => {
    const { sut, addSurveyStub } = makeSut();
    const addSurveySpy = jest.spyOn(addSurveyStub, "add");
    sut.handle(makeFakeRequest());
    expect(addSurveySpy).toHaveBeenCalledWith({
      question: "any_question",
      answers: [
        {
          image: "any_image",
          answer: "any_answer",
        },
      ],
    });
  });

  test("Should return 500 if AddSurvey throws", async () => {
    const { sut, addSurveyStub } = makeSut();

    jest.spyOn(addSurveyStub, "add").mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()));
    });

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });
});
