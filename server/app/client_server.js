var request = require('request');


request('http://localhost:4000/getservices', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    if (!error && response.statusCode === 200) {
        var services = JSON.parse(body); //whatever data we get is in string form convert to object 
        services.forEach(service => {
            console.log(
                service.method + ' ' + service.service + ' ' +
                '\n')
        });
    }
});

var initialServices = {
    method: "method3",
    service: [{
            'name': 'Pinto'
        },
        {
            'name': 'Lysanne'
        }
    ]
}
request.post({
    headers: {
        'content-type': 'application/json'
    },
    url: 'http://localhost:4000/setServices',
    body: JSON.stringify(initialServices)
}, function (erro, response, body) {
    console.log(body); //Response to be displayed
})

// var queryServices = {
//     method: "method1",
//     service: [{
//             'name': 'Lerisa'
//         },
//         {
//             'name': 'Vishal'
//         },
//         {
//             'name': 'Chetana'
//         }, 
//         {
//             'name': 'Yvens'
//         },
//         {
//             'name': 'Lysanne'
//         }
//     ]
// }
// request.post({
//     headers: {
//         'content-type': 'application/json'
//     },
//     url: 'http://localhost:4000/checkServiceStatus',
//     body: JSON.stringify(queryServices)
// }, function (erro, response, body) {
//     console.log(body); //Response to be displayed
// })