require('dotenv').config();
const express = require('express');
const productRoute = require('./routes/product_route');
const dbService = require('./database/db_connection');



const app = express();

app.use(logger);
app.use(express.json());


function logger(req, res, next) {
    console.log('request url:', req.url);
    next();
}


app.use(productRoute.router);




dbService
    .connectClient()
    .then(() => {
        app.listen(process.env.SERVER_PORT);
        console.log("server started at port " + process.env.SERVER_PORT);
        console.log("connected to db");
        

    })
    .catch((_) => {
        console.log("connection failure");
    });




