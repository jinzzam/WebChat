var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var app = express();
var io = require('socket.io').listen(4000);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat');
var loginRouter = require('./routes/login');
var joinRouter = require('./routes/join');
var joinFailRouter = require('./routes/joinFail');
var noIDRouter = require('./routes/noID');
var unmatchedPwRouter = require('./routes/unmatchedPw');
var logoutRouter = require('./routes/logout');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);
app.use('/login', loginRouter);
app.use('/join', joinRouter);
app.use('/join-fail', joinFailRouter);
app.use('/no-id', noIDRouter);
app.use('/unmatched-pw', unmatchedPwRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    port: '3306',
    database: 'mydb'
});

io.sockets.on('connection', function (socket) {
    socket.on('join:room', function (data) {
        console.log('room' + data.roomId);
        socket.join('room' + data.roomId);
    });
    socket.on('chatReq', function (data) {
        console.log(data);
        io.sockets.in('room1').emit('chatRes', data.msg);
    });
});