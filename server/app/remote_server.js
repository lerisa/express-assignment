//REST - Representational State Transfer
var express = require('express');

// body-parser is use to parse the Request body and populate the req object
var bodyParser = require('body-parser');

// Mongoose
var mongoose = require('mongoose');

// Create Express app
var app = express();
app.set('port', 4000);
app.use(bodyParser.json());
app.listen(app.get('port'), function () {
    console.log('Server up at http://localhost:' + app.get('port'));
});

// Database connectivity
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.get('/getservices', function (req, res) {

    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) {
            throw err;
        }
        var dbo = db.db("servicedb");
        dbo.collection("services").findOne({}, function (err, result) {
            res.json(result);
            if (err) {
                throw err;
            }
            console.log(result);
            db.close();
        });
    });

}); //works


app.post('/setServices', function (req, res) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) {

            throw err;
        }
        var dbo = db.db("servicedb"); //name of db
        dbo.collection("services").insertOne(req.body, function (err, response) { //The API should store the data in DB
            //collection name is services

            if (err) {
                //put logger here
                throw err;
            }
            console.log(response); //The API should read a JSON payload with a list of services and the method.
            res.json({
                //The API should immediately return a request saying Request is accepted
                message: "Request was accepted"
            });
            db.close();
        });
    });
});

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// app.post('/checkServiceStatus', function (req, res) {
//     MongoClient.connect(url, {
//         useNewUrlParser: true
//     }, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("servicedb");
//         dbo.collection("services").find({
//             method: req.body.method
//         }).toArray(function (err, result) {
//             if (err) throw err;
//             console.log(result[0].service);
//             var startedServices = result[0].service;
//             var queryServices = req.body.service;
//             var responseServices = [];

//             queryServices.forEach(queryService => {
//                 var started = false;
//                 startedServices.forEach(startedService => {
//                     if (queryService.name == startedService.name) {
//                         started = true;
//                     }
//                 });
//                 responseServices.push({
//                     name: queryService,
//                     status: started
//                 });

//             });
//             console.log(req.body.service);
//             res.json({
//                 status: responseServices
//             });
//             db.close();
//         });
//     });
// });