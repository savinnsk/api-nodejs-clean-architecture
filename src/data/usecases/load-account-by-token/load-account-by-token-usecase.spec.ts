import { ILoadAccountByToken } from "@/domain/usecases/login/load-account-by-token";
import { LoadAccountByTokenUseCase } from "./load-account-by-token-usecase";
import { Decrypter } from "@/data/protocols/cryptography/decrypter";

type SutTypes = {
  sut: ILoadAccountByToken;
  decrypterStub: Decrypter;
};

const makeDecrypterStub = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt(value: string): Promise<string | null> {
      return new Promise((resolve) => resolve("any_value"));
    }
  }

  return new DecrypterStub();
};

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypterStub();
  const sut = new LoadAccountByTokenUseCase(decrypterStub);
  return {
    sut,
    decrypterStub,
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
});
