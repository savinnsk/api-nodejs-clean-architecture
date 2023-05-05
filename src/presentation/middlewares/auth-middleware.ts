import { LoadAccountByToken } from "@/domain/usecases/login/load-account-by-token";
import { HttpRequest, HttpResponse } from "../protocols";
import { Middleware } from "../protocols/middleware";
import { forbidden } from "../helpers/http/http-helper";
import { AccessDeniedError } from "../errors/access-denied-error";

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const user = await this.loadAccountByToken.load(
      httpRequest.headers?.["x-access-token"]
    );

    if (user) {
      return new Promise((resolve) => resolve(null));
    }

    return forbidden(new AccessDeniedError());
  }
}
