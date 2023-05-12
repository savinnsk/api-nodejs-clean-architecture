import { SignUpController } from "@/presentation/controllers/login/signup/signup-controller";
import { Controller } from "@/presentation/protocols";
import { makeDbAddAccountDbUseCase } from "../../usecases/account/add-account/db-add-account-factory";
import { makerDbAuthenticationUseCase } from "../../usecases/account/authentication/db-authentication-factory";
import { makeLogControllerDecorator } from "../../log-controllers-decorator-factory";
import { makeSignupValidation } from "./signup-validation-factory";

export const makeSignupController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccountDbUseCase(),
    makeSignupValidation(),
    makerDbAuthenticationUseCase()
  );

  return makeLogControllerDecorator(controller);
};
