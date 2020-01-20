require("dotenv").config();
const createError = require("http-errors");
const express = require('express');
const path = require('path');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const DB_PORT = process.env.DB_PORT;
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require("./routes/auth");

const app = express();

//login
app.use(
    session({
        secret: "passport-authentication",
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, callback) => {
    console.log("SERIALIZADOR");
    callback(null, user);
});

passport.deserializeUser(async(id, callback) => {
    console.log("DESERIALIZADOR");

    try {
        const user = await User.findById(id);

        if (!user) return callback({ message: "El usuario no existe" });

        return callback(null, user);
    } catch (error) {
        console.log(error);
        return callback(error);
    }
});

app.use(flash());
passport.use(
    new LocalStrategy({
            passReqToCallback: true
        },
        async(req, username, password, next) => {
            console.log("LOCAL-STRATEGY");
            console.log(password);
            try {
                console.log("USER" + username);
                const user = await User.findOne({ username });

                if (!user)
                    return next(null, false, { message: "El usuario no existe" });

                if (!bcrypt.compareSync(password, user.password))
                    return next(null, false, { message: "La contraseña no es correcta" });
                console.log(user);
                next(null, user);
            } catch (error) {
                next(error);
            }
        }
    )
);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Esta configuracion para recoger el body de express esta deprecated es mejor con bodyPaser
/* app.use(express.json());
app.use(express.urlencoded({ extended: false })); */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

//rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/auth", authRouter);

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

mongoose.connect(`mongodb://localhost:${DB_PORT}/app`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(`Base de datos conectada en el puerto ${DB_PORT}`))
    .catch(err => { throw err })

module.exports = app;