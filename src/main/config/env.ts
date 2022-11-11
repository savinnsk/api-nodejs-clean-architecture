const username = "savinnsk"
const password = "EGA130pha100"

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/clean-code-api',
  port: process.env.PORT || 5050,
  mongoAPiCluster: `mongodb+srv://${username}:${password}@apicluster0.u3gd8.mongodb.net/?retryWrites=true&w=majority`
}
