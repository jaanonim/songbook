const config = require('../config/api');
const mongoose = require('mongoose');

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
