import { MissingParamsError } from "../../errors"
import { badRequest } from "../../helpers/http-helper"
// import { HttpRequest } from "../../protocols"
import { LoginController } from "./login"

/* const makeFakeHttpRequest = (): HttpRequest => ({
  body: {
    email: "any_mail@mail.com",
    password: "any_password"
  }
}) */

const makeSut = (): LoginController => {
  return new LoginController()
}

describe("Login Controller", () => {
  test("should return 400 if no email is provider", async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({ body: { password: "any_password" } })
    expect(httpResponse).toEqual(badRequest(new MissingParamsError("email")))
  })

  test("should return 400 if no password is provider", async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({ body: { email: "any_mail@mail.com" } })
    expect(httpResponse).toEqual(badRequest(new MissingParamsError("password")))
  })
})
