import { AddSurveyModel } from "@/domain/usecases/survey/add-survey";
import { AddSurveyUseCase } from "./add-survey-usecase";
import { AddSurveyRepository } from "@/data/protocols/survey/add-survey-repository";

type SutType = {
  sut: AddSurveyUseCase;
  addSurveyRepositoryStub: AddSurveyRepository;
};

const fakeRequest: AddSurveyModel = {
  question: "any_question",
  answers: [
    {
      image: "any_image",
      answer: "any_answer",
    },
  ],
};

const makeAddSurveyRepositoryStub = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add(surveyData: AddSurveyModel): Promise<void> {}
  }

  return new AddSurveyRepositoryStub();
};

const makeSut = (): SutType => {
  const addSurveyRepositoryStub = makeAddSurveyRepositoryStub();
  const sut = new AddSurveyUseCase(addSurveyRepositoryStub);
  return {
    addSurveyRepositoryStub,
    sut,
  };
};

describe("AddSurveyUseCase", () => {
  test("should calls AddSurveyRepository with correct values", () => {
    const { sut, addSurveyRepositoryStub } = makeSut();

    const spy = jest.spyOn(addSurveyRepositoryStub, "add");

    sut.add(fakeRequest);

    expect(spy).toHaveBeenCalledWith({
      question: "any_question",
      answers: [
        {
          image: "any_image",
          answer: "any_answer",
        },
      ],
    });
  });
});
