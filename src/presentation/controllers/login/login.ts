
import { MissingParamsError } from "../../errors"
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
      if (!httpRequest.body.password) {
        return new Promise(resolve => resolve(badRequest(new MissingParamsError("password"))))
      }

      if (!httpRequest.body.email) {
        return new Promise(resolve => resolve(badRequest(new MissingParamsError("email"))))
      }

      this.emailValidator.isValid(httpRequest.body.email)
    } catch (err) {

    }
  }
}
