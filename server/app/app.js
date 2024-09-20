require('dotenv').config();

const express = require('express');
const db = require('./db/db');
const productRoute = require('./routes/product_route');



const app = express();

app.use(express.json());

app.use("/", function (req, res, next) {
    console.log("request url: ", req.url);  
    res.send("Hello");
     
});

// app.use(express.json());
app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
});

 

db.connect().then(() => {
    app.use('/', productRoute);
    
}).catch((err) => {
    console.log('connect error ', err);

});




