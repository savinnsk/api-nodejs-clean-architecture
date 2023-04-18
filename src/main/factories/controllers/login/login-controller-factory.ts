import { LoginController } from "../../../../presentation/controllers/login/login-controller";
import { Controller } from "../../../../presentation/protocols";
import { makeLogControllerDecorator } from "../../log-controllers-decorator-factory";
import { makerDbAuthenticationUseCase } from "../../usecases/authentication/db-authentication-factory";
import { makeLoginValidation } from "./login-validation-factory";

export const makeLoginController = (): Controller => {
  const controller = new LoginController(
    makeLoginValidation(),
    makerDbAuthenticationUseCase()
  );
  return makeLogControllerDecorator(controller);
};
