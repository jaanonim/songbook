const config = require('../config/api');
const Song = require('../models/song');
const ProccessFile = require('../utilities/proccessFile');
const {
    dirname,
    join
} = require('path');

// @route   GET api/song
// @desc    Get all songs
// @access  Public
exports.findAll = async (req, res) => {
    try {
        let aggregate_options = [];
        let search = !!(req.query.q);
        let tags = !!(req.query.tags);

        // Search
        if (search) aggregate_options.push({
            $match: {
                $or: [{
                    "title": {
                        $regex: req.query.q,
                        $options: 'i'
                    }
                }, {
                    "author": {
                        $regex: req.query.q,
                        $options: 'i'
                    }
                }]
            }
        });

        // Tags
        if (tags) {
            const tagsNames = req.query.tags.split(',')
            for (let i = 0; i < tagsNames.length; i++) {
                aggregate_options.push({
                    $match: {
                        "tags": {
                            $in: [tagsNames[i]]
                        }
                    }
                });
            }
        }

        // Sort
        let sort_order = 1;
        req.query.sort = req.query.sort || "title";
        if (req.query.sort[0] == "-") {
            sort_order = -1;
            req.query.sort = req.query.sort.slice(1);
        }

        aggregate_options.push({
            $sort: {
                [req.query.sort]: sort_order,
                "_id": -1
            },
        });

        const options = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || config.pangination.limit
        };

        const myAggregate = Song.aggregate(aggregate_options);
        const result = await Song.aggregatePaginate(myAggregate, options);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// @route   GET api/song/:id
// @desc    Get song by id
// @access  Public
exports.findOne = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({
            message: "Song not found"
        });
        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// @route   POST api/song
// @desc    Create song
// @access  Public
exports.create = async (req, res) => {
    try {
        const song = new Song({
            ...req.body
        });
        await song.save();
        res.status(201).json(song);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// @route   PATCH api/song/:id
// @desc    Update song
// @access  Public
exports.update = async (req, res) => {
    try {
        const song = await Song.findOneAndUpdate({
            _id: req.params.id
        }, req.body);
        if (!song) return res.status(404).json({
            message: "Song not found"
        });
        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// @route   DELETE api/song/:id
// @desc    Delete song
// @access  Public
exports.destroy = async (req, res) => {
    try {
        const song = await Song.findByIdAndRemove(req.params.id);
        if (!song) return res.status(404).json({
            message: "Song not found"
        });
        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// @route   PUT api/song/import
// @desc    Import songs
// @access  Public
exports.import = async (req, res) => {
    try {
        const data = await new ProccessFile(req.file).proccessFile();
        let songs = [];
        for (let i = 0; i < data.length; i++) {
            data[i].tags = req.body.tags || [];
            const song = new Song(
                data[i]
            );
            await song.save();
            songs.push(song);
        }
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// @route   PUT api/song/export
// @desc    Export songs
// @access  Public
exports.export = async (req, res) => {
    try {
        let songids = req.body.id
        let type = req.body.type
        if (!Array.isArray(songids)) songids = [songids]
        const songs = await Song.find({
            _id: {
                $in: songids
            }
        });
        const path = await new ProccessFile(songs, type).exportSongs();
        const root = dirname(require.main.filename);
        res.sendFile(join(root, "..", path));
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
