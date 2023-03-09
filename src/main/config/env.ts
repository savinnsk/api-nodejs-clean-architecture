import * as dotenv from "dotenv";
dotenv.config();

export default {
  // docker generates a dns name for the mongo container with image name mongo
  mongoUrl: process.env.MONGO_URL || "mongodb://mongo:27017/clean-node-api",
  port: process.env.PORT || 5050,
  secret: process.env.JWT_SECRET || "random123",
  mongoAPiCluster: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.frion87.mongodb.net/?retryWrites=true&w=majority`,
};
