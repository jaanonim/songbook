const mongoose = require("mongoose");

const DbUri = process.env.ATLAS_URI;

const setupDb = () => {
    mongoose.promise = global.Promise;
    mongoose.connect(DbUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    });

    const connection = mongoose.connection;
    connection.once("open", () =>
        console.log("MongoDB --  database connection established successfully!")
    );
    connection.on("error", (err) => {
        console.log(
            "MongoDB connection error. Please make sure MongoDB is running. " +
                err
        );
        process.exit();
    });
};

module.exports = { setupDb };
