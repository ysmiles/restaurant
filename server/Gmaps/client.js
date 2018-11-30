const clientKey = require('./congfig').key

const googleMapsClient = require('@google/maps').createClient({
    key: clientKey
});

module.exports = googleMapsClient