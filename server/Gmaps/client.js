const config = require('./config')

const googleMapsClient = require('@google/maps').createClient({
    key: config.key,
    Promise: Promise
});

module.exports = googleMapsClient