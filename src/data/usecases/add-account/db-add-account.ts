import { AccountModel, AddAccount, AddAccountModelDTO, Encrypter, AddAccountRepository } from "./db-add-account-protocols"

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModelDTO): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    await this.addAccountRepository.add(Object.assign({}, account, { password: hashedPassword }))
    return new Promise(resolve => resolve(null))
  }
}
