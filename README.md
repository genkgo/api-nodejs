api-nodejs
==========

A node js package to connected to the Genkgo System


## Using

After installing the application you can use the Genkgo Api

```javascript
var genkgoapi = require('genkgoapi');

api = genkgoapi.create(settings.url, settings.apiKey);

api.command('organization', 'query', {q: 'webmaster'}, function (result) {
	console.log(result);
});

```

## Testing

* Copy test-settings.js.sample to test-settings.js
* Change the url to your domain
* Change the Api key to a key given by the Genkgo system

run the test node
```bash
node tests/test.js
```

## Info

* [https://github.com/genkgo/api-docs](https://github.com/genkgo/api-docs)
* [https://www.genkgo.com/](https://www.genkgo.com/)
