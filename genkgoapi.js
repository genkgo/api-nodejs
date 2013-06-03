var https = require('https');

function GenkgoApi (url, api_key) {
	this.url = url;
	this.api_key = api_key;
	this._debug = false;
}

GenkgoApi.prototype = {
	command: function (part, command, parameters, readyFunction) {
		var data = {
			part: part,
			command: command,
			token: this.api_key
		}  

		var post_data = {};

		for (var attrname in data) { post_data[attrname] = data[attrname]; }
		for (var attrname in parameters) { post_data[attrname] = parameters[attrname]; }

		this.post(post_data, readyFunction);
	},

	post: function (data, readyFunction) {
		var querystring = require('querystring');
		var post_data = querystring.stringify(data);

		var options = {
			hostname: this.url,
			port: 443,
			path: '/admin/api',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': post_data.length
			}
		}

		var obj = this;

		var req = https.request(options, function(res) {
			obj.debug('STATUS: ' + res.statusCode);
			obj.debug('HEADERS: ' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			res.on('data', function (data) {
				data = JSON.parse(data)
				readyFunction(data);
				obj.debug('BODY: ' + data);
			});
		});

		req.on('error', function(e) {
			obj.debug('problem with request: ' + e.message);
		});

		req.write(post_data);
		req.end();
	},

	debug: function (data) {
		if (typeof this._debug == 'function') {
			this._debug(data);
		}
	},

	setDebug: function (value) {
		this._debug = value;
	}

};


exports.create = function (url, apiKey) {
	return new GenkgoApi(url, apiKey);
}

