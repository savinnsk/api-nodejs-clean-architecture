import { ILoadAccountByToken } from "@/domain/usecases/login/load-account-by-token";
import { HttpRequest, HttpResponse } from "../protocols";
import { Middleware } from "../protocols/middleware";
import { forbidden, ok, serverError } from "../helpers/http/http-helper";
import { AccessDeniedError } from "../errors/access-denied-error";

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: ILoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.["x-access-token"];

      if (accessToken) {
        const account = await this.loadAccountByToken.load(
          accessToken,
          this.role
        );

        if (account) {
          return ok({ accountId: account.id });
        }
      }

      return forbidden(new AccessDeniedError());
    } catch (err) {
      return serverError(err);
    }
  }
}
