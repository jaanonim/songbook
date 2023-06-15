const { createApi } = require("unsplash-js");
const nodeFetch = require("node-fetch");

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    fetch: nodeFetch,
});

// @route   GET api/unsplash
// @desc    Get list of photos from unsplash
// @access  Public
exports.getPhotos = async (req, res) => {
    try {
        const page = req.query.page || 1;
        console.log(page);
        const result = await unsplash.search.getPhotos({
            query: "background",
            page: page,
            perPage: 50,
            orientation: "landscape",
        });

        if (result.errors) {
            res.send(result.errors);
        }
        res.send(result.response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
};
