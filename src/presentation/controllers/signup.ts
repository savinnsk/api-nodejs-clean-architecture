import { MissingParamsError } from "../errors/missing-params-error"
import { HttpRequest, HttpResponse } from "../protocols/http"
import { badRequest } from "../helpers/http-helper"

export class SingUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field))
      }
    }
  }
}
