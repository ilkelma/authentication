
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , fs = require('fs')
  , User = require('./models/User.js');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/form', function(req, res){[1]
	fs.readFile('./form.html', function(error, content){[2]
		if(error) {
			res.writeHead(500);
			res.end();
		}
		else{
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end(content, 'utf-8');
		}
	});
});

app.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.addUser(username, password, function(err, user) {
    if (err) throw err;
    res.redirect('/form');
  });  
});

//Check if we're running in Cloud9
function portNum() {
   if(process.env.C9_PID) {
    return process.env.PORT;
    } else {
    return 3000;
    }
}

app.listen(portNum());
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
