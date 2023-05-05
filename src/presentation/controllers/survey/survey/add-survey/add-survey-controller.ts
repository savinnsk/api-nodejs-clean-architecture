import { AddSurvey } from "@/domain/usecases/survey/add-survey";
import {
  badRequest,
  noContent,
  ok,
  serverError,
} from "@/presentation/helpers/http/http-helper";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";
import { Validation } from "@/presentation/protocols/validation-helper";

export class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) return badRequest(error);

      const { question, answers } = httpRequest.body;
      await this.addSurvey.add({
        question,
        answers,
      });

      return noContent();
    } catch (e) {
      return serverError(e);
    }
  }
}
