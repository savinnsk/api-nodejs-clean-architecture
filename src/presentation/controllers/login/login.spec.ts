import { InvalidParamsError, MissingParamsError } from "../../errors"
import { badRequest } from "../../helpers/http-helper"
import { EmailValidator } from "../signup/signup-protocols"
// import { HttpRequest } from "../../protocols"
import { LoginController } from "./login"

/* const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    email: "any_mail@mail.com",
    password: "any_password"
  }
}) */

const makeEmailValidatorStub = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const sut = new LoginController(emailValidatorStub)

  return {
    sut,
    emailValidatorStub
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
    const httpRequest = await sut.handle({ body: { password: "any_password", email: "any_mail@mail.com" } })
    expect(httpRequest).toEqual(badRequest(new InvalidParamsError("email")))
  })

  test("should call emailValidator with correct value", async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid")
    await sut.handle({ body: { password: "any_password", email: "any_mail@mail.com" } })
    expect(isValidSpy).toHaveBeenCalledWith("any_mail@mail.com")
  })
})
