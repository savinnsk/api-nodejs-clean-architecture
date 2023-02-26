import { DbAddAccount } from "../../../data/usecases/add-account/db-add-account"
import { BcryptAdapter } from "../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter"
import { AccountMongoRepository } from "../../../infra/db/mongodb/account/account-mongo-repository"
import { LogMongoRepository } from "../../../infra/db/mongodb/log/log-mongo-repository"
import { SignUpController } from "../../../presentation/controllers/signup/signup-controller"
import { Controller } from "../../../presentation/protocols"
import { LogControllerDecorator } from "../../decorators/log-controller-decorator"
import { makeSignupValidation } from "./signup-validation-factory"

export const makeSignupController = (): Controller => {
  const salt = 12
  const bcrypter = new BcryptAdapter(salt)
  const addRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcrypter, addRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignupValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
