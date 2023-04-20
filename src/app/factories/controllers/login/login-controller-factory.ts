import { LoginController } from "@/presentation/controllers/login/sigin/login-controller";
import { Controller } from "@/presentation/protocols";
import { makeLoginValidation } from "./login-validation-factory";
import { makerDbAuthenticationUseCase } from "../../usecases/authentication/db-authentication-factory";
import { makeLogControllerDecorator } from "../../log-controllers-decorator-factory";

export const makeLoginController = (): Controller => {
  const controller = new LoginController(
    makeLoginValidation(),
    makerDbAuthenticationUseCase()
  );
  return makeLogControllerDecorator(controller);
};
