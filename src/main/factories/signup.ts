import { DbAddAccount } from "../../data/usecases/add-account/db-add-account"
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter"
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account"
import { SignUpController } from "../../presentation/controllers/signup/signup"
import { Controller } from "../../presentation/protocols"
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter"
import { LogControllerDecorator } from "../decorators/log"

export const makeSignupController = (): Controller => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const bcrypter = new BcryptAdapter(salt)
  const addRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcrypter, addRepository)
  const signUpController = new SignUpController(emailValidator, dbAddAccount)
  return new LogControllerDecorator(signUpController)
}
