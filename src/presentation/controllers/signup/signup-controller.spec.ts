import { SignUpController } from "./signup-controller";
import { ServerError } from "../../errors";
import {
  AccountModel,
  AddAccountModelDTO,
  HttpRequest,
  Validation,
  AddAccount,
} from "./signup-controller-protocols";
import { ok, serverError, badRequest } from "../../helpers/http/http-helper";
import {
  Authentication,
  AuthenticationDTO,
} from "../../../domain/usecases/authentication";

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    email: "any_mail@mail.com",
    password: "any_password",
  },
});

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModelDTO): Promise<AccountModel> {
      return await new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }

  return new AddAccountStub();
};

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: "any_name",
    email: "any_email@mail.com",
    password: "any_password",
    passwordConfirmation: "any_password",
  },
});

const makeFakeAccount = (): AccountModel => ({
  id: "valid_id",
  name: "valid_name",
  email: "valid_email@mail.com",
  password: "valid_password",
});

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error {
      return null;
    }
  }

  return new ValidationStub();
};
const makeAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth({ email, password }: AuthenticationDTO): Promise<string> {
      return new Promise((resolve) => resolve("any_token"));
    }
  }
  return new AuthenticationStub();
};

interface SutTypes {
  sut: SignUpController;
  addAccountStub: AddAccount;
  validationStub: Validation;
  authenticationStub: Authentication;
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount();
  const validationStub = makeValidation();
  const sut = new SignUpController(addAccountStub, validationStub);
  const authenticationStub = makeAuthenticationStub();

  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub,
  };
};

describe("Sing up Controller", () => {
  test("Should return 500 if addAccount throws", async () => {
    const { sut, addAccountStub } = makeSut();

    jest.spyOn(addAccountStub, "add").mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()));
    });

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  test("Should call AddAccount with correct values", async () => {
    const { sut, addAccountStub } = makeSut();

    const addSpy = jest.spyOn(addAccountStub, "add");

    await sut.handle(makeFakeRequest());
    expect(addSpy).toHaveBeenLastCalledWith({
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
    });
  });

  test("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeAccount()));
  });

  test("Should call Validator with correct values", async () => {
    const { sut, validationStub } = makeSut();

    const validateSpy = jest.spyOn(validationStub, "validate");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenLastCalledWith(httpRequest.body);
  });

  test("Should returns 400 if Validator returns an error", async () => {
    const { sut, validationStub } = makeSut();

    jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
    const httpRequest = makeFakeRequest();
    const httResponse = await sut.handle(httpRequest);
    expect(httResponse).toEqual(badRequest(new Error()));
  });

  test("should call Authentication with correct value", async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, "auth");
    await sut.handle(makeFakeHttpRequest());
    expect(authSpy).toHaveBeenCalledWith({
      email: "any_mail@mail.com",
      password: "any_password",
    });
  });
});
