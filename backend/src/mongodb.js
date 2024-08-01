const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("Missing MONGODB_URI environment variable");
    process.exit(1);
}

mongoose.connect(uri)
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((err) => {
        console.log("failed to connect", err);
    });

const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const LogInCollection = mongoose.model("LogInCollection", logInSchema);

module.exports = LogInCollection;
