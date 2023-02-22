export default {
  mongoUrl: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/",
  port: process.env.PORT || 5050,

  mongoAPiCluster: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@savinnsk.bmso1rh.mongodb.net/?retryWrites=true&w=majority`,
};
