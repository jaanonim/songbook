const Model = require('./model');
const Db = require("../database");

module.exports = class Song extends Model {
    constructor(data) {
        super(data);
    }

    static async getAll() {
        const songsRaw = await Db.getDb().collection("songs").find({}).toArray();
        let songs = [];
        for (let i = 0; i < songsRaw.length; i++) {
            songs.push(new Song(songsRaw[i]));
        }
        return songs;
    }
}
