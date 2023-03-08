var redis = require("redis");
var logger = require("winston");

function createRedisClient (port, host, options) {
	var client = redis.createClient(port, host, options);

	client.on('ready', function () {
		logger.info('Redis is ready');
	});

	client.on('error', function (err) {
		logger.error('Redis error', err.stack || err);
	});

	return client;
}

module.exports = createRedisClient;
