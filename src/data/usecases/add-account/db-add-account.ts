import { Hasher } from "@/data/protocols/cryptography/hasher";
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-email-repository";
import { AccountModel } from "@/domain/models/account";
import {
  AddAccount,
  AddAccountModelDTO,
} from "@/domain/usecases/login/add-account";

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add(accountData: AddAccountModelDTO): Promise<AccountModel> {
    const userAlreadyExists =
      await this.loadAccountByEmailRepository.loadByEmail(accountData.email);
    if (userAlreadyExists) {
      return null;
    }

    const hashedPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    );

    return account;
  }
}
