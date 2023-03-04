import { LoginController } from "../../../presentation/controllers/login/login-controller";
import { Controller } from "../../../presentation/protocols";

import { DbAuthentication } from "../../../data/usecases/authentication/db-authentication";

import { LogControllerDecorator } from "../../decorators/log-controller-decorator";
import env from "../../config/env";

import { makeLoginValidation } from "./login-validation-factory";

import { LogMongoRepository } from "../../../infra/db/mongodb/log/log-mongo-repository";
import { AccountMongoRepository } from "../../../infra/db/mongodb/account/account-mongo-repository";
import { BcryptAdapter } from "../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter";
import { JwtAdapter } from "../../../infra/cryptography/jwt-adapter/jwt-adapter";

export const makeLoginController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.secret);

  const accountMongoRepository = new AccountMongoRepository();
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  );

  const loginController = new LoginController(
    makeLoginValidation(),
    dbAuthentication
  );
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(loginController, logMongoRepository);
};
