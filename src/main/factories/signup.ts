import { DbAddAccount } from "../../data/usecases/add-account/db-add-account"
import { BcryptAdapter } from "../../infra/criptography/bcrypt-adapter"
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account"
import { SignUpController } from "../../presentation/controllers/signup/signup"
import { EmailValidatorAdapter } from "../../utils/email-validator-adapter"

export const makeSignupController = (): SignUpController => {
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const bcrypter = new BcryptAdapter(salt)
  const addRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcrypter, addRepository)
  return new SignUpController(emailValidator, dbAddAccount)
}
