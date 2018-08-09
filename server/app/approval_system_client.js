var request = require('request');

// API 1 Request Body
var api1RequestBody = {
    request: [{
        name: "Lerisa Gomes",
        designation: "UI Developer",
        role: "Level 1"
    }]
}
// API 1 : Register Approver
request.post({
    headers: {
        'content-type': 'application/json'
    },
    url: 'http://localhost:3301/registerApprover',
    body: JSON.stringify(api1RequestBody)
}, function (erro, response, body) {
    console.log(body);
});

//API 2 Request Body
var api2RequestBody = {
    request: [{
            name: "Purchase Iphone",
            approvals: ["Level 1", "Level 2"]
        },
        {
            name: "Create Email",
            approvals: ["Level 1"]
        }
    ]
}
// API 2 : Register Services
request.post({
    headers: {
        'content-type': 'application/json'
    },
    url: 'http://localhost:3301/registerService',
    body: JSON.stringify(api2RequestBody)
}, function (erro, response, body) {
    console.log(body);
});

// API 3 Request Body
var api3RequestBody = {
    request: [{
        serviceId: "OKDBKORH"
    }]
}
// API 3 : Request a Service
request.post({
    headers: {
        'content-type': 'application/json'
    },
    url: 'http://localhost:3301/requestService',
    body: JSON.stringify(api3RequestBody)
}, function (erro, response, body) {
    console.log(body);
});

// API 4 Request Body
var api4RequestBody = {
    request: [{
        serviceId: "OKDBKORH",
        accessToken: "12345678"
    }]
}
// API 4 : Provide Level 1 Approval
request.post({
    headers: {
        'content-type': 'application/json'
    },
    url: 'http://localhost:3301/approveLevel1',
    body: JSON.stringify(api4RequestBody)
}, function (erro, response, body) {
    console.log(body);
});


// // API 5 Request Body
var api5RequestBody = {
    request: [{
        serviceId: "OKDBKORH",
        accessToken: "12345678"
    }]
}
// API 5 : Provide Level 2 Approval
request.post({
    headers: {
        'content-type': 'application/json'
    },
    url: 'http://localhost:3301/approveLevel2',
    body: JSON.stringify(api5RequestBody)
}, function (erro, response, body) {
    console.log(body);

});

// API 6 Request Body
var api6RequestBody = {
    request: [{
        requestToken: "47364EJR"
    }]
}
// API 6 : Check status of the service request
request.post({
    headers: {
        'content-type': 'application/json'
    },
    url: 'http://localhost:3301/requestStatus',
    body: JSON.stringify(api6RequestBody)
}, function (erro, response, body) {
    console.log(body);
});