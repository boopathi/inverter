var koa = require('koa'),
	app = koa(),
	logger = require('koa-logger'),
	staticDir = require('koa-static'),
	port = process.env.PORT || 4004;

app.use(logger());
app.use(staticDir('./'));

app.listen(port, function() {
	console.log('Koa server listening on port ' + port);
});
