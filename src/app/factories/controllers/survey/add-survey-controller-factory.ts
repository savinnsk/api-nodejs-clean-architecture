import { AddSurveyController } from "@/presentation/controllers/survey/survey/add-survey/add-survey-controller";
import { Controller } from "@/presentation/protocols";
import { makeAddSurveyValidation } from "./add-survey-validation-factory";
import { makeDbAddSurvey } from "../../usecases/survey/db-add-survey-factory";

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurvey()
  );

  return controller;
};
