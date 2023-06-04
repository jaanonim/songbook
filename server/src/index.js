require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require("passport");
const path = require('path');
const logger = require('express-simple-logger');

// Setup
const DbUri = process.env.ATLAS_URI;
const PORT = process.env.PORT || 3000;

//=== 1 - CREATE APP
const app = express();

app.use(cors());
app.use(logger());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.use(express.urlencoded({
    extended: false
}));

//=== 2 - SET UP DATABASE
mongoose.promise = global.Promise;
mongoose.connect(DbUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB --  database connection established successfully!'));
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});


//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./middlewares/jwt")(passport);


//=== 4 - CONFIGURE ROUTES
require('./routes/index')(app);


//=== 5 - REDIRECT TO CLIENT
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});


//=== 6 - START SERVER
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
