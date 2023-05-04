import { AddSurveyUseCase } from "@/data/usecases/add-survey/add-survey-usecase";
import { AddSurvey } from "@/domain/usecases/survey/add-survey";
import { SurveyMongoRepository } from "@/infra/db/mongodb/survey/survey-mongo-repository";

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();

  return new AddSurveyUseCase(surveyMongoRepository);
};
