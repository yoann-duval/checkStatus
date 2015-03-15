// get commande line arguments
var argv = require('minimist')(process.argv.slice(2));

// defined basic constant
const port = argv.p || 3000;

// Require koa as a dependency
var koa = require("koa");
var lusca = require('koa-lusca'); 

// Intialize the base application
var app = koa();

// add security thanks to koa-lusca
app.use(lusca.csrf());
//app.use(lusca.csp({/* ... */}));
app.use(lusca.xframe({ value: 'SAMEORIGIN' }));
//app.use(lusca.p3p({ value: 'ABCDEF' }));
//app.use(lusca.hsts({ maxAge: 31536000 });
app.use(lusca.xssProtection());

app.use(function *(next){
	// Before
	var timestampBefore = new Date().getTime();

	yield next;

	// After
	var timestampAfter = new Date().getTime();
	var difference = timestampAfter - timestampBefore;
	console.log("Processing took " + difference + "ms");
});

app.use(function *() {
	// Set the request body to 'Hello Koa!'
	this.body = 'Hello Koa!';
});

// Start the server
app.listen(port);
