import { DbAddAccount } from "@/data/usecases/add-account/db-add-account";
import { AddAccount } from "@/domain/usecases/add-account";
import { BcryptAdapter } from "@/infra/cryptography/bcrypt-adapter/bcrypt-adapter";
import { AccountMongoRepository } from "@/infra/db/mongodb/account/account-mongo-repository";

export const makeDbAddAccountDbUseCase = (): AddAccount => {
  const salt = 12;
  const bcrypter = new BcryptAdapter(salt);
  const addRepository = new AccountMongoRepository();
  const loadAccountByEmailRepository = new AccountMongoRepository();
  return new DbAddAccount(
    bcrypter,
    addRepository,
    loadAccountByEmailRepository
  );
};
