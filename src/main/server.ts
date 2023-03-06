import { MongoHelper } from "../infra/db/mongodb/helpers/mongodb-helper";
import env from "./config/env";

MongoHelper.connect(env.mongoAPiCluster)
  .then(async () => {
    const app = (await import("./config/app")).default;
    app.listen(env.port, () => console.log(`server running at ${env.port}`));
  })
  .catch(console.error);
