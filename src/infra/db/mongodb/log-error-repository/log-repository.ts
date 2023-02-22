import { LogErrorRepository } from "../../../../data/protocols/db/log-error-repository";
import { MongoHelper } from "../helpers/mongodb-helper";

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollections = await MongoHelper.getCollection("errors");
    await errorCollections.insertOne({ stack, date: new Date() });
  }
}
