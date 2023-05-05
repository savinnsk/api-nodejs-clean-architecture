import { LoadAccountByToken } from "@/domain/usecases/login/load-account-by-token";
import { AccessDeniedError } from "../errors/access-denied-error";
import { forbidden } from "../helpers/http/http-helper";
import { HttpRequest } from "../protocols";
import { AuthMiddleware } from "./auth-middleware";
import { AccountModel } from "@/domain/models/account";

type SutTypes = {
  loadAccountByTokenStub: LoadAccountByToken;
  sut: AuthMiddleware;
};

const makeFakeRequest = (): HttpRequest => ({
  headers: { "x-access-token": "any_token" },
});

const makeLoadAccountTokenStub = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(accessToken: string): Promise<AccountModel | null> {
      return new Promise((resolve) => resolve(null));
    }
  }
  return new LoadAccountByTokenStub();
};

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountTokenStub();
  const sut = new AuthMiddleware(loadAccountByTokenStub);

  return {
    loadAccountByTokenStub,
    sut,
  };
};

describe("Auth Middleware", () => {
  test("should return 403 if no authorization header is provided", async () => {
    const { sut } = makeSut();
    const response = await sut.handle({});

    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  test("should call LoadAccountByToken with correct accessToken", async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    const spyLoad = jest.spyOn(loadAccountByTokenStub, "load");
    await sut.handle(makeFakeRequest());

    expect(spyLoad).toHaveBeenCalledWith("any_token");
  });
});
