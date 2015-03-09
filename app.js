var fs = require('fs');
var express = require('express');
var path = require('path');
var phantomjs = require('phantomjs');
var childProcess = require('child_process');
var pdf = require('html-pdf');
var binPath = phantomjs.path;
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pdf = require('html-pdf');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
var childArgs = [
  path.join(__dirname, 'pdfgen.js'),
]
 
childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    fs.readFile('default.pdf','utf-8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data); });
  console.log('Hey boy');
})

// app.use('/', routes);
// app.use('/users', users);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
