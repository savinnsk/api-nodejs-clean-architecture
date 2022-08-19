import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from "../protocols/http"
import { MissingParamsError } from "../errors/missing-params-error"
import { badRequest } from "../helpers/http-helper"
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamsError } from '../errors/invalid-params-error'
import { ServerError } from '../errors/server-error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamsError('email'))
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
