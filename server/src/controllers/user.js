const User = require('../models/user');

// @route GET admin/user
// @desc Returns all users
// @access Public
exports.findMany = async function (req, res) {
    const users = await User.find({});
    res.status(200).json({
        users
    });
};

// @route POST api/user
// @desc Add a new user
// @access Public
exports.create = async (req, res) => {
    try {
        const {
            email
        } = req.body;

        // Make sure this account doesn't already exist
        const user = await User.findOne({
            email
        });

        if (user) return res.status(401).json({
            message: 'The email address you have entered is already associated with another account. You can change this users role instead.'
        });

        const password = '_' + Math.random().toString(36).substr(2, 9); //generate a random password
        const newUser = new User({
            ...req.body,
            password
        });

        const user_ = await newUser.save();

        //Generate and set password reset token
        user_.generatePasswordReset();

        // Save the updated user object
        await user_.save();

        res.status(200).json({
            message: 'User created.'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public
exports.findOne = async function (req, res) {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) return res.status(401).json({
            message: 'User does not exist'
        });

        res.status(200).json({
            user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

// @route PUT api/user/{id}
// @desc Update user details
// @access Public
exports.update = async function (req, res) {
    try {
        const update = req.body;
        const id = req.params.id;
        const userId = req.user._id;

        //Make sure the passed id is that of the logged in user
        if (userId.toString() !== id.toString()) return res.status(401).json({
            message: "Sorry, you don't have the permission to upd this data."
        });

        const user = await User.findAndUpdate({
            _id: id
        }, {
            $set: update
        });

        return res.status(200).json({
            user,
            message: 'User has been updated'
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// @route DESTROY api/user/{id}
// @desc Delete User
// @access Public
exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;
        const user_id = req.user._id;

        //Make sure the passed id is that of the logged in user
        if (user_id.toString() !== id.toString()) return res.status(401).json({
            message: "Sorry, you don't have the permission to delete this data."
        });

        await User.findByIdAndDelete(id);
        res.status(200).json({
            message: 'User has been deleted'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
