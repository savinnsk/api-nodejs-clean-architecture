import { ok, serverError } from "@/presentation/helpers/http/http-helper";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";
import { Validation } from "@/presentation/protocols/validation-helper";

export class AddSurveyController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(httpRequest);
      return ok({});
    } catch (e) {
      return serverError(e);
    }
  }
}
