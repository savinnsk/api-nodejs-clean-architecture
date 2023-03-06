import "dotenv";
import { envDev } from "../../../.env-development";

export default {
  mongoUrl: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/",
  port: process.env.PORT || 5050,
  secret: process.env.JWT_SECRET || "random123",
  mongoAPiCluster: `mongodb+srv://${envDev.user}:${envDev.password}@cluster0.frion87.mongodb.net/?retryWrites=true&w=majority`,
};
