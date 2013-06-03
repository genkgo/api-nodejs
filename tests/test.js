var genkgoapi = require('../genkgoapi')
	, settings = require('./test-settings')
	, assert = require('assert');

api = genkgoapi.create(settings.url, settings.apiKey);

/*
api.setDebug(function (log) {
	console.log(log);
});
*/

assert.equal('object', typeof api);

api.command('organization', 'query', {q: 'webmaster'}, function (data) {
	assert.equal('object', typeof data);
	assert.equal('webmaster', data[0].q);
	assert.equal(1, data[1].parentid);
});

api.command('organization', 'create', {name: 'test unit', objectclass: 'organizationalUnit'}, function (data) {
	assert.equal('object', typeof data);

	var entryId = data.id;

	api.command('organization', 'delete', {target: entryId}, function (data) {
		assert.equal('boolean', typeof data);
		assert.equal(true, data);

	});
});