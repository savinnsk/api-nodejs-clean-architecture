import { SignUpController } from "../../../../presentation/controllers/signup/signup-controller";
import { Controller } from "../../../../presentation/protocols";
import { makeLogControllerDecorator } from "../../log-controllers-decorator-factory";
import { makeDbAddAccountDbUseCase } from "../../usecases/add-account/db-add-account-factory";
import { makerDbAuthenticationUseCase } from "../../usecases/authentication/db-authentication-factory";
import { makeSignupValidation } from "./signup-validation-factory";

export const makeSignupController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccountDbUseCase(),
    makeSignupValidation(),
    makerDbAuthenticationUseCase()
  );

  return makeLogControllerDecorator(controller);
};
