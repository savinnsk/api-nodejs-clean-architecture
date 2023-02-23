import { LoadAccountByEmailRepository } from "../../../../data/protocols/db/load-account-email-repository";
import {
  AddAccountRepository,
  AccountModel,
  AddAccountModelDTO,
  MongoHelper,
} from "./account-protocols";

export class AccountMongoRepository
  implements AddAccountRepository, LoadAccountByEmailRepository
{
  async add(accountData: AddAccountModelDTO): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection("accounts");
    const createAccount = await accountCollection.insertOne(accountData);
    const account = await accountCollection.findOne({
      _id: createAccount.insertedId,
    });
    return MongoHelper.map(account);
  }

  async loadByEmail(email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection("accounts");
    const account = await accountCollection.findOne({ email: email });

    return MongoHelper.map(account);
  }
}
