require('dotenv').config();
const express = require('express');
const productRoute = require('./routes/product_route');
const cartRoute = require('./routes/cart_route');
const dbService = require('./database/db_connection');
const consts = require('./const');
const ordersRoute = require('./routes/orders_route');


const app = express();

// Check if required environment variables are set
const requiredEnvVars = ['SERVER_PORT', 'DB_CONNECTION_STRING'];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        console.error(`*****************Error: Missing required environment variable ${varName}*****************`);
        process.exit(1); // Exit the process with failure
    } else {
        console.log(`************** ENV Success: Found value : ${varName} **************`);
    }
});

// Middleware for logging requests
app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    next();
});

// Middleware for parsing JSON bodies
app.use(express.json());

// Use product routes with version control
app.use(consts.API_BASE_VERSION, productRoute);
app.use(consts.API_BASE_VERSION, cartRoute);
app.use(consts.API_BASE_VERSION, ordersRoute);

/**
 * Start the server and connect to the database
 */
const startServer = async () => {
    try {
        await dbService.connectClient();
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server started at port ${process.env.SERVER_PORT}`);
            console.log('Connected to the database');
        });
    } catch (error) {
        console.error('Database connection failure:', error);
        process.exit(1); // Exit the process with failure
    }
};

// Start the server
startServer();
