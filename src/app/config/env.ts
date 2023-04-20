import * as dotenv from "dotenv";
dotenv.config();

export default {
  // docker generates a dns name for the mongo container with image name mongo
  port: process.env.PORT || 5050,
  secret: process.env.JWT_SECRET || "random123",
  mongoUrl: process.env.MONGO_URL || "mongodb://mongo:27017/clean-node-api",
};
