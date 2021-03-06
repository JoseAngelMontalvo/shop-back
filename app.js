require("dotenv").config();
const createError = require("http-errors");
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const DB_PORT = process.env.DB_PORT;
const bodyParser = require("body-parser");
const indexRouter = require('./routes/index');
const cors = require('cors')


const app = express();

var corsOptions = {
    origin: 'http://example.com:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())

require("./passport/config")(app);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//conexion a la base de datos
mongoose.connect(`mongodb://localhost:${DB_PORT}/app`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log(`Base de datos conectada en el puerto ${DB_PORT}`))
    .catch(err => { throw err })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger("dev"));


//rutas
app.use('/api/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;