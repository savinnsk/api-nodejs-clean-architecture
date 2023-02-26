import { AccountModel, AddAccount, AddAccountModelDTO, Hasher, AddAccountRepository } from "./db-add-account-protocols"

export class DbAddAccount implements AddAccount {

  constructor (
  private readonly hasher: Hasher,
  private readonly addAccountRepository: AddAccountRepository) {}

  async add (accountData: AddAccountModelDTO): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
