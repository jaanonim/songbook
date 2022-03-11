const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Song title is required',
    },
    author: {
        type: String,
    },
    data: {
        type: Map,
        required: true,
    },
    tags: {
        type: [String],
    }
}, {
    timestamps: true
});


SongSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Songs', SongSchema);
