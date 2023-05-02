import { AddSurveyRepository } from "@/data/protocols/survey/add-survey-repository";
import { AddSurveyModel } from "@/domain/usecases/survey/add-survey";
import { MongoHelper } from "../helpers/mongodb-helper";

export class SurveyMongoRepository implements AddSurveyRepository {
  async add(data: AddSurveyModel): Promise<void | Error> {
    const surveyCollection = await MongoHelper.getCollection("surveys");
    await surveyCollection.insertOne(data);
  }
}
