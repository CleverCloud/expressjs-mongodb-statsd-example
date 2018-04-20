const statsd = require('node-statsd');
const client = new statsd();
module.exports = client;