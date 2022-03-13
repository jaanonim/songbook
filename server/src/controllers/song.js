const config = require('../config/api');
const Song = require('../models/song');


// @route   GET api/song
// @desc    Get all songs
// @access  Public
exports.findAll = async (req, res) => {
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
}

// @route   GET api/song/:id
// @desc    Get song by id
// @access  Public
exports.findOne = async (req, res) => {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({
        message: "Song not found"
    });
    res.status(200).json(song);
}

// @route   POST api/song
// @desc    Create song
// @access  Public
exports.create = async (req, res) => {
    const song = new Song({
        ...req.body
    });
    await song.save();
    res.status(201).json(song);
}

// @route   PUT api/song/:id
// @desc    Update song
// @access  Public
exports.update = async (req, res) => {
    const song = await Song.findOneAndReplace({
        _id: req.params.id
    }, req.body);
    if (!song) return res.status(404).json({
        message: "Song not found"
    });
    res.status(200).json(song);
}

// @route   DELETE api/song/:id
// @desc    Delete song
// @access  Public
exports.destroy = async (req, res) => {
    const song = await Song.findByIdAndRemove(req.params.id);
    if (!song) return res.status(404).json({
        message: "Song not found"
    });
    res.status(200).json(song);
}