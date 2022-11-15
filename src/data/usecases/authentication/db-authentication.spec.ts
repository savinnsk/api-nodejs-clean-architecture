import { AuthenticationDTO } from "../../../domain/usecases/authentication"
import { HashComparer } from "../../protocols/cryptography/cryptography"
import { TokenGenerator } from "../../protocols/cryptography/token-generator"
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-email-repository"
import { UpdateAccessTokenRepository } from "../../protocols/db/update-access-token-repository"
import { AccountModel } from "../add-account/db-add-account-protocols"
import { DbAuthentication } from "./db-authentication"

const makeFakeAccount = (): AccountModel => ({

  id: "any_id",
  name: "any_name",
  email: "any_mail@mail.com",
  password: "hashed_password"

})

const makeFakeAuthentication = (): AuthenticationDTO => ({
  email: "any_mail@mail.com",
  password: "any_password"
})

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHashComparerStub = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true))
    }
  }

  return new HashComparerStub()
}

const makeTokenGeneratorStub = (): TokenGenerator => {
  class TokenGenerateStub implements TokenGenerator {
    async generate (id: string): Promise<string> {
      return new Promise(resolve => resolve("any_token"))
    }
  }
  return new TokenGenerateStub()
}

const makeUpdateAccessTokenRepositoryStub = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async update (id: string, token: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  tokenGeneratorStub: TokenGenerator
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
  const hashComparerStub = makeHashComparerStub()
  const tokenGeneratorStub = makeTokenGeneratorStub()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepositoryStub()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  }
}

describe("DbAuthentication useCase", () => {
  test("should call loadAccountByEmailRepository with correct email", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, "load")
    await sut.auth(makeFakeAuthentication())

    expect(loadSpy).toHaveBeenCalledWith("any_mail@mail.com")
  })

  test("should throw if loadAccountByEmailRepository throws", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, "load")
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })

  test("should return null loadAccountByEmailRepository return null", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, "load").mockReturnValueOnce(null)
    const accessToken = await sut.auth(makeFakeAuthentication())

    expect(accessToken).toBeNull()
  })

  test("should call HashComparer with correct values", async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, "compare")
    await sut.auth(makeFakeAuthentication())

    expect(compareSpy).toHaveBeenCalledWith("any_password", "hashed_password")
  })

  test("should throw if HashComparer throws", async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, "compare")
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })

  test("should return null lHashComparer returns false", async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, "compare").mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const accessToken = await sut.auth(makeFakeAuthentication())

    expect(accessToken).toBeNull()
  })

  test("should call TokenGenerator with correct id", async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const tokenSpy = jest.spyOn(tokenGeneratorStub, "generate")
    await sut.auth(makeFakeAuthentication())

    expect(tokenSpy).toHaveBeenCalledWith("any_id")
  })

  test("should throw if TokenGenerator throws", async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    jest.spyOn(tokenGeneratorStub, "generate")
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAuthentication())

    await expect(promise).rejects.toThrow()
  })

  test("should TokenGenerator return a token with success", async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBe("any_token")
  })

  test("should call UpdateAccessTokenRepository with correct values", async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, "update")
    await sut.auth(makeFakeAuthentication())

    expect(updateSpy).toHaveBeenCalledWith("any_id", "any_token")
  })
})
