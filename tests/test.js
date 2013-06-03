var genkgoapi = require('../genkgoapi')
	, settings = require('./test-settings')
	, assert = require('assert');

api = genkgoapi.create(settings.url, settings.apiKey);

assert.equal('object', typeof api);