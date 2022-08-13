import { MissingParamsError } from "../errors/missing-params-error"
import { HttpRequest, HttpResponse } from "../protocols/http"

export class SingUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamsError('name')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamsError('email')
      }
    }
  }
}
