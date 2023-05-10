import { ILoadAccountByToken } from "@/domain/usecases/login/load-account-by-token";
import { LoadAccountByTokenUseCase } from "./load-account-by-token-usecase";
import { Decrypter } from "@/domain/cryptography/decrypter";
import { LoadAccountByTokenRepository } from "@/domain/repository/account/load-account-by-token";
import { AccountModel } from "@/domain/models/account";

type SutTypes = {
  sut: ILoadAccountByToken;
  decrypterStub: Decrypter;
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository;
};

const makeFakeAccountResponse = (): AccountModel => ({
  id: "valid_id",
  name: "valid_name",
  email: "valid_email@mail.com",
  password: "valid_password",
});

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt(value: string): Promise<string | null> {
      return new Promise((resolve) => resolve("any_value"));
    }
  }

  return new DecrypterStub();
};

const makeLoadAccountRepositoryStub = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub
    implements LoadAccountByTokenRepository
  {
    load(accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccountResponse()));
    }
  }

  return new LoadAccountByTokenRepositoryStub();
};

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub();
  const loadAccountByTokenRepositoryStub = makeLoadAccountRepositoryStub();
  const sut = new LoadAccountByTokenUseCase(
    decrypterStub,
    loadAccountByTokenRepositoryStub
  );
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub,
  };
};

describe("LoadAccountByToken UseCase", () => {
  test("should call decrypter with correct values", () => {
    const { sut, decrypterStub } = makeSut();
    const spy = jest.spyOn(decrypterStub, "decrypt");
    sut.load("any_token", "any_role");
    expect(spy).toHaveBeenCalledWith("any_token");
  });

  test("should return null if decrypter return null", async () => {
    const { sut, decrypterStub } = makeSut();
    jest
      .spyOn(decrypterStub, "decrypt")
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const response = await sut.load("any_token");
    expect(response).toBeNull();
  });

  test("should call loadAccountByTokenRepository with correct values", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const spy = jest.spyOn(loadAccountByTokenRepositoryStub, "load");
    await sut.load("any_token", "any_role");
    expect(spy).toHaveBeenCalledWith("any_value");
  });
});
