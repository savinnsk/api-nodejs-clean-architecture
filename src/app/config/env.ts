import * as dotenv from "dotenv";
dotenv.config();

export default {
  // docker generates a dns name for the mongo container with image name mongo
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT || 5000,
  secret: process.env.JWT_SECRET,
};
