import { LoadAccountByToken } from "@/domain/usecases/login/load-account-by-token";
import { AccessDeniedError } from "../errors/access-denied-error";
import { forbidden, ok, serverError } from "../helpers/http/http-helper";
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

const makeFakeAccountResponse = (): AccountModel => ({
  id: "valid_id",
  name: "valid_name",
  email: "valid_email@mail.com",
  password: "valid_password",
});

const makeLoadAccountTokenStub = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(
      accessToken: string,
      role?: string
    ): Promise<AccountModel | null> {
      return new Promise((resolve) => resolve(makeFakeAccountResponse()));
    }
  }
  return new LoadAccountByTokenStub();
};

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountTokenStub();
  const sut = new AuthMiddleware(loadAccountByTokenStub, role);

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

  test("should return 403 if LoadAccountByToken return null", async () => {
    const { sut, loadAccountByTokenStub } = makeSut();

    jest
      .spyOn(loadAccountByTokenStub, "load")
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));

    const response = await sut.handle(makeFakeRequest());

    expect(response).toEqual(forbidden(new AccessDeniedError()));
  });

  test("should return 200 if LoadAccountByToken returns an account", async () => {
    const { sut } = makeSut();

    const response = await sut.handle(makeFakeRequest());

    expect(response).toEqual(ok({ accountId: "valid_id" }));
  });

  test("should return 503 if LoadAccountByToken throws", async () => {
    const { sut, loadAccountByTokenStub } = makeSut();

    jest
      .spyOn(loadAccountByTokenStub, "load")
      .mockReturnValueOnce(
        new Promise((resolve, rejects) => rejects(new Error()))
      );

    const response = await sut.handle(makeFakeRequest());

    expect(response).toEqual(serverError(new Error()));
  });

  test("should call LoadAccountByToken with correct values", async () => {
    const role = "any_role";
    const { sut, loadAccountByTokenStub } = makeSut(role);
    const spyLoad = jest.spyOn(loadAccountByTokenStub, "load");
    sut.handle(makeFakeRequest());

    expect(spyLoad).toHaveBeenCalledWith("any_token", role);
  });
});
