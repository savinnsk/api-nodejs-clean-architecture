import { AddAccountModelDTO } from "@/domain/usecases/login/add-account";

import { ObjectId } from "mongodb";
import { AccountModel } from "@/domain/models/account";
import { MongoHelper } from "../helpers/mongodb-helper";
import { UpdateAccessTokenRepository } from "@/data/protocols/db/account/update-access-token-repository";
import { LoadAccountByEmailRepository } from "@/data/protocols/db/account/load-account-email-repository";
import { AddAccountRepository } from "@/data/protocols/db/account/add-account-repository";
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
