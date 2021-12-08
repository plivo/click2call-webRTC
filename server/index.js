const https = require('https')
const express = require("express");
const formidable = require("express-formidable");
require('dotenv').config()
const PORT = process.env.PORT;

const app = express();

app.use(formidable());
app.use(express.static(__dirname + '/../client/'));

app.post('/makeCall/', function(req, res) {

    jsonObject = JSON.stringify({
        "phoneMeNumber": req.fields.src,
        "destinationNumber": req.fields.dst,
    });

    // prepare the header
    let postHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + new Buffer.from(process.env.PLIVO_AUTH_ID + ':' + process.env.PLIVO_AUTH_TOKEN).toString('base64')
    };

    // set the post options
    let postOptions = {
        port: 443,
        host: 'phlo-runner-service.plivo.com',
        path: process.env.PHLO_ID,
        method: 'POST',
        headers: postHeaders,
    };

    // do the POST request
    let reqPost = https.request(postOptions, function(response) {
        console.log("statusCode: ", response.statusCode);
        response.on('data', function(d) {
            console.info('POST result:\n');
            process.stdout.write(d);
            console.info('\n\nPOST completed');
            res.send(d);
        });
    });

    // write the json data
    console.log(jsonObject);
    reqPost.write(jsonObject);
    reqPost.end();
    reqPost.on('error', function(e) { // log any errors
        console.error(e);
    });
})

app.listen(PORT, function() {
    console.log("listening on port", process.env.PORT);
});