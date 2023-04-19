import {
  Controller,
  HttpRequest,
  HttpResponse,
  Authentication,
  Validation,
} from "./login-controller-protocols";

import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from "@/presentation/helpers/http/http-helper";

export class LoginController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const accessToken = await this.authentication.auth({ email, password });

      if (!accessToken) {
        return unauthorized();
      }

      return ok({ accessToken });
    } catch (err) {
      return serverError(err);
    }
  }
}
