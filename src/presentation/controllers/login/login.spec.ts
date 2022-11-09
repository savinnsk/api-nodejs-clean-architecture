import { InvalidParamsError, MissingParamsError, ServerError } from "../../errors"
import { badRequest, serverError } from "../../helpers/http-helper"
import { EmailValidator } from "../signup/signup-protocols"
import { HttpRequest } from "../../protocols"
import { Authentication } from "../../../domain/usecases/authentication"
import { LoginController } from "./login"

const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    email: "any_mail@mail.com",
    password: "any_password"
  }
})

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAuthenticationStub = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return new Promise(resolve => resolve("any_token"))
    }
  }
  return new AuthenticationStub()
}

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const authenticationStub = makeAuthenticationStub()
  const sut = new LoginController(emailValidatorStub, authenticationStub)

  return {
    sut,
    emailValidatorStub,
    authenticationStub
  }
}

describe("Login Controller", () => {
  test("should return 400 if no email is provider", async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: { password: "any_password" } })
    expect(httpResponse).toEqual(badRequest(new MissingParamsError("email")))
  })

  test("should return 400 if no password is provider", async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({ body: { email: "any_mail@mail.com" } })
    expect(httpResponse).toEqual(badRequest(new MissingParamsError("password")))
  })

  test("should return 400 if an invalid email is provide", async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false)
    const httpResponse = await sut.handle({ body: { password: "any_password", email: "any_mail@mail.com" } })
    expect(httpResponse).toEqual(badRequest(new InvalidParamsError("email")))
  })

  test("should call emailValidator with correct value", async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid")
    await sut.handle(makeFakeHttpRequest())
    expect(isValidSpy).toHaveBeenCalledWith("any_mail@mail.com")
  })

  test("should return 500 if EmailValidator throws", async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test("should call Authentication with correct value", async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, "auth")
    await sut.handle(makeFakeHttpRequest())
    expect(authSpy).toHaveBeenCalledWith("any_mail@mail.com", "any_password")
  })
})
