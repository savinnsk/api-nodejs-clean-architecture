
import { MissingParamsError } from "../../errors"
import { badRequest } from "../../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../../protocols"

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body.password) {
        return new Promise(resolve => resolve(badRequest(new MissingParamsError("password"))))
      }

      if (!httpRequest.body.email) {
        return new Promise(resolve => resolve(badRequest(new MissingParamsError("email"))))
      }
    } catch (err) {

    }
  }
}
