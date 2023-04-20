import { LoadAccountByEmailRepository } from "../../../../data/protocols/db/account/load-account-email-repository";
import { UpdateAccessTokenRepository } from "../../../../data/protocols/db/account/update-access-token-repository";
import {
  AddAccountRepository,
  AccountModel,
  AddAccountModelDTO,
  MongoHelper,
} from "./account-protocols";

import { ObjectId } from "mongodb";
export class AccountMongoRepository
  implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository
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

    return account && MongoHelper.map(account);
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection("accounts");
    await accountCollection.updateOne(
      {
        _id: new ObjectId(id) as any,
      },
      {
        $set: {
          accessToken: token,
        },
      },
      {
        upsert: true,
      }
    );
  }
}
