import * as dotenv from "dotenv";
dotenv.config();

export default {
  mongoUrl: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/",
  port: process.env.PORT || 5050,
  secret: process.env.JWT_SECRET || "random123",
  mongoAPiCluster: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.frion87.mongodb.net/?retryWrites=true&w=majority`,
};
