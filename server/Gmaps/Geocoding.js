const https = require('https')
const key = require('./config').key

/*
* ref: https://developers.google.com/maps/documentation/geocoding/intro#geocoding
* @parameter rawAddr is a json which describe the address information
* Essential property in rawAddr: address
*
* @return json object contains the geolocation infotmation
*/

function geocoding(rawAddr) {
    let req =  'https://maps.googleapis.com/maps/api/geocode/json?'

    // if rawAddr is empty
    // error handle

    // add all parameters to request url
    for(let p in rawAddr) {
        req = req.concat(p).concat("=").concat(rawAddr[x]).concat("&")
    }

    // add key parameter
    req = req.concat('key=').concat(key)

    // call the geocoding https API
    https.get(req, (res) => {
        var body = '';
    
        res.on('data', function(chunk){
            body += chunk;
        });
    
        res.on('end', function(){
            let geoRes = JSON.parse(body);

            // parse the json to return a reassembled json we need

        });
    }).on('error', function(e){
          console.log("The request to google geocoding gets an error: ", e);
    });
}