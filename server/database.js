const {
  MongoClient,
  ServerApiVersion
} = require('mongodb');

module.exports = class Database {
  static async connect() {
    Database.client = new MongoClient(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1
    });

    await Database.client.connect();
    Database.db = Database.client.db("songbook");
    console.log("Connected to database.");
  }

  static getDb() {
    return Database.db;
  }
}
