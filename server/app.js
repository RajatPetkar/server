const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const router = require('./router/router');
const dotenv = require('dotenv'); 
const bodyParser = require('body-parser');
const cors = require('cors');
const cookie = require('cookie-parser')
dotenv.config({path : './config.env'});


require('./db/conn');
app.use(cors());
app.use(cookie());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//Middleware
app.use(router);

app.listen(port,()=>{
    console.log('listening on port 5000');
});
