//REST - Representational State Transfer
var express = require('express');

// body-parser is use to parse the Request body and populate the req object
var bodyParser = require('body-parser');

// Randomatic
var randomize = require('randomatic');

// Mongoose
var mongoose = require('mongoose');

// Create Express app
var app = express();
app.set('port', 3301);
app.use(bodyParser.json());
app.listen(app.get('port'), function () {
    console.log('Server up at http://localhost:' + app.get('port'));
});

// Database connectivity
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// API 1 : Register Approver
app.post('/registerApprover', function (req, res) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;

        req.body.request.forEach(element => {
            element.accessToken = randomize('A0', 8);
        });

        var dbo = db.db("assignment2");
        dbo.collection("approvers").insertMany(req.body.request, function (err, response) {
            if (err) throw err;
            var returnObject = [];
            req.body.request.forEach(element => {
                returnObject.push({
                    name: element.name,
                    accessToken: element.accessToken
                });
            });
            res.json({
                result: returnObject,
                status: {
                    code: 200,
                    message: "Succesfully registered the approvers"
                }
            });
            db.close();
        });
    });
});

// API 2 : Register Services
app.post('/registerService', function (req, res) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;

        req.body.request.forEach(element => {
            element.serviceId = randomize('A0', 8);
        });
        var dbo = db.db("assignment2");
        dbo.collection("services").insertMany(req.body.request, function (err, response) {
            if (err) throw err;
            var returnObject = [];
            req.body.request.forEach(element => {
                returnObject.push({
                    name: element.name,
                    serviceId: element.serviceId
                });
            });
            res.json({
                result: returnObject,
                status: {
                    code: 200,
                    message: "Succesfully registered the services"
                }
            });
            db.close();
        });
    });
});

// API 3 : Request a Service
app.post('/requestService', function (req, res) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        else {
            var newToken = randomize('A0', 8)
            var dbo = db.db("assignment2");
            dbo.collection("services").find({
                serviceId: req.body.request[0].serviceId
            }).toArray(function (err, result) {
                if (err) throw err;
                else if (result.length != 0) {
                    res.json({
                        result: [{
                            requestToken: newToken
                        }],
                        status: {
                            code: 200,
                            message: "Succesfully registered the approvers"
                        }
                    });
                } else {
                    res.json({
                        result: [{
                            requestToken: null
                        }],
                        status: {
                            code: 400,
                            message: "Failed to register the approvers"
                        }
                    });
                }
                db.close();
            });

        }
    });
});

// API 4 : Provide Level 1 Approval
app.post('/approveLevel1', function (req, res) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        else {
            var newToken = randomize('A0', 8);
            var dbo = db.db("assignment2");
            dbo.collection("services").find({
                serviceId: req.body.request[0].serviceId
            }).toArray(function (err, result) {
                if (err) throw err;
                else if (result.length != 0) {
                    dbo.collection("approvers").find({
                        accessToken: req.body.request[0].accessToken
                    }).toArray(function (err, result) {
                        if (err) throw err;
                        else if (result.length != 0) {
                            insertToken(newToken, result[0].name, "level1");
                            res.json({
                                result: [{
                                    requestToken: newToken
                                }],
                                status: {
                                    code: 400,
                                    message: "Successfully Approved"
                                }
                            });
                        } else {
                            res.json({
                                result: [{
                                    requestToken: null
                                }],
                                status: {
                                    code: 400,
                                    message: "ERROR: Incorrect AccessToken"
                                }
                            });
                        }
                        db.close();
                    });
                } else {
                    res.json({
                        result: [{
                            requestToken: null
                        }],
                        status: {
                            code: 400,
                            message: "ERROR: Incorrect ServiceId"
                        }
                    });
                }
                db.close();
            });
        }
    });
});

// API 5 : Provide Level 2 Approval
app.post('/approveLevel2', function (req, res) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        var newToken = randomize('A0', 8);
        var dbo = db.db("assignment2");
        dbo.collection("services").find({
            serviceId: req.body.request[0].serviceId
        }).toArray(function (err, result) {
            if (err) throw err;
            else if (result.length != 0) {
                dbo.collection("approvers").find({
                    accessToken: req.body.request[0].accessToken
                }).toArray(function (err, result) {
                    if (err) throw err;
                    else if (result.length != 0) {
                        insertToken(newToken, result[0].name, "level2");
                        res.json({
                            result: [{
                                requestToken: newToken
                            }],
                            status: {
                                code: 200,
                                message: "Succesfully Approved"
                            }
                        });
                    } else {
                        res.json({
                            result: [{
                                requestToken: null
                            }],
                            status: {
                                code: 400,
                                message: "ERROR: Incorrect AccessToken"
                            }
                        });
                    }
                    db.close();
                });
            } else {
                res.json({
                    result: [{
                        requestToken: null
                    }],
                    status: {
                        code: 400,
                        message: "ERROR: Incorrect ServiceId"
                    }
                });
            }
            db.close();
        });
    });
});

// API 6 : Check status of the service request
app.post('/requestStatus', function (req, res) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        else {
            var dbo = db.db("assignment2");
            dbo.collection("requests").find({
                requestToken: req.body.request[0].requestToken
            }).toArray(function (err, result) {
                if (err) throw err;
                else if (result.length != 0) {
                    res.json({
                        result: [result[0]],
                        status: {
                            code: 200,
                            message: "Succesfully Approved"
                        }
                    });
                } else {
                    res.json({
                        result: [null],
                        status: {
                            code: 400,
                            message: "Couldn't Find Request Token"
                        }
                    });
                }
                db.close();
            });
        }
    });
});


function insertToken(token, user, level) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, db) {
        if (err) throw err;
        else {
            var dbo = db.db("assignment2");
            dbo.collection("requests").insertOne({
                requestToken: token,
                approvals: {
                    stage: level,
                    approver: user,
                    approverDate: getDate()
                }
            }, function (err, response) {
                if (err) throw err;
                else db.close();
            });
        }
    });
}

function getDate() {
    return new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
}