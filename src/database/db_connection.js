
require("dotenv").config();
const mongoose = require("mongoose");

// creating client
module.exports.connectClient = async function () {

    try {
        let promise = await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to db | HOST:" + promise.connection.host);
    } catch (error) {
        console.log("error connecting to db", error);

    }

};


