var PORT = process.env.PORT || 5000;
const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const app        = express();

var http = require('http');
var server = http.Server(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./app/routes/records.routes'));

const DB_CONNECTION = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true'
mongoose.connect(DB_CONNECTION, { promiseLibrary: global.Promise }) 

server.listen(PORT, function() {
    console.log('App is running!')
});