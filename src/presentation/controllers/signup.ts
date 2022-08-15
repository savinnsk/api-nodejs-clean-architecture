import { MissingParamsError } from "../errors/missing-params-error"
import { HttpRequest, HttpResponse } from "../protocols/http"
import { badRequest } from "../helpers/http-helper"
import { Controller } from '../protocols/controller'

export class SingUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field))
      }
    }
  }
}
