var cacheManager = require('./cache-manager');
var client = require('./redis');

/**
 * Instantiates a redis related component of the specified `type`.
 * This is a factory method for this module to be compliant with wire.js
 * create factory
 *
 * @param {string} 	type 		Type of component to create (cache-manager|client)
 * @param {...*=} 	argument 	Argument to be given to constructor of chosen component
 * 
 * @return {CacheManager|RedisClient}	Instantiated component
 */
function makeRedisComponent () {
	var args = Array.prototype.slice.call(arguments, 0);

	var className = args.shift();

	if (className == 'cache-manager') {
		return cacheManager.apply(this, args);

	} else if (className == 'client') {
		return client.apply(this, args);

	} else {
		throw new Error('Unknown component type ' + className);
	}
}

module.exports = makeRedisComponent;

module.exports.CacheManager = cacheManager;
module.exports.RedisClient = client;
