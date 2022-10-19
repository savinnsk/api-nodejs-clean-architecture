import { AddAccountRepository, AccountModel, AddAccountModelDTO, MongoHelper } from "./account-protocols"

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModelDTO): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const createAccount = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: createAccount.insertedId })
    return MongoHelper.map(account)
  }
}
