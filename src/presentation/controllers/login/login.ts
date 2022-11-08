
import { InvalidParamsError, MissingParamsError } from "../../errors"
import { badRequest } from "../../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../../protocols"
import { EmailValidator } from "../signup/signup-protocols"

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { password, email } = httpRequest.body
      if (!password) {
        return new Promise(resolve => resolve(badRequest(new MissingParamsError("password"))))
      }

      if (!email) {
        return new Promise(resolve => resolve(badRequest(new MissingParamsError("email"))))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) return new Promise(resolve => resolve(badRequest(new InvalidParamsError("email"))))
    } catch (err) {

    }
  }
}
