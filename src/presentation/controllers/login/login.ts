
import { Authentication } from "../../../domain/usecases/authentication"
import { InvalidParamsError, MissingParamsError } from "../../errors"
import { badRequest, serverError, unauthorized } from "../../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../../protocols"
import { EmailValidator } from "../signup/signup-protocols"

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication
  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const requiredFields = ["password", "email"]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(`${field}`))
        }
      }

      const isValid = this.emailValidator.isValid(email)
      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorized()
      }

      if (!isValid) return badRequest(new InvalidParamsError("email"))
    } catch (err) {
      return serverError(err)
    }
  }
}
