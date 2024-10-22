require("dotenv").config();
const mongoose = require("mongoose");

/**
 * Connects to the MongoDB database using Mongoose.
 * The MongoDB connection URL is retrieved from the environment variable MONGO_URL.
 * Logs the connection status to the console.
 * 
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 * @throws Will throw an error if the connection fails.
 */
module.exports.connectClient = async function () {
    try {
        const connection = await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log(`************** Connected to DB | HOST: ${connection.connection.host} **************`);
    } catch (error) {
        console.error("Error connecting to DB", error);
        process.exit(1); // Exit the process with failure
    }
};
