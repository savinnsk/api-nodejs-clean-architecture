import { Controller } from "../../presentation/protocols/controller"
import { HttpRequest, HttpResponse } from "../../presentation/protocols/http"

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    // if (httpResponse.statusCode === 500) {}
    return httpResponse
  }
}
