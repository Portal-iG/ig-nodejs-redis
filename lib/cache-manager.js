var logger = require('winston');

function CacheManager (cacheService, prefix) {
	if (!(this instanceof CacheManager))
		return new CacheManager(cacheService, prefix);	
	
	this._prefix = prefix;
	this._cacheService = cacheService;
}

CacheManager.prototype.cacheExists = function (url, cb) {
	logger.info('Checking cache of image url', url)

	var key = buildCacheKey(url);

	this._cacheService.exists(key, function (err, exists) {
		if (err) {
			logger.error('Error reading key', key, 
					'from cache', 
					err.stack || err);
			cb(err);
			return;
		}
		cb(null, exists == 1);
	});
}

/**
 * [cacheSet description]
 * @param  {[type]} url         [description]
 * @param  {[type]} cropFormats [description]
 * @return {[type]}             [description]
 * @todo refactor to set cache automatically after image operations
 */
CacheManager.prototype.cacheSet = function (url, cropFormats) {
	this._cacheService.set(buildCacheKey(url), 
			JSON.stringify(cropFormats));
}

function buildCacheKey (url) {
	return this._prefix + url;
}

module.exports = CacheManager;