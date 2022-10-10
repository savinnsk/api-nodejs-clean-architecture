
import { AddAccountRepository, AccountModel, AddAccountModelDTO, MongoHelper } from "./account-protocols"

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModelDTO): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const dataToInsertMongo = await accountCollection.insertOne(accountData)
    const findUserByIdMongo = await accountCollection.findOne({ _id: dataToInsertMongo.insertedId })
    const { _id, name, password, email } = findUserByIdMongo
    const account = { id: _id.toString(), name, password, email }
    return account
  }
}
