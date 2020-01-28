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
const MongoStore = require('connect-mongo')(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
//const GoogleStrategy = require("passport-google").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const flash = require("connect-flash");

const indexRouter = require('./routes/index');


const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//conexion a la base de datos
mongoose.connect(`mongodb://localhost:${DB_PORT}/app`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log(`Base de datos conectada en el puerto ${DB_PORT}`))
    .catch(err => { throw err })

//mongoose.Promise = global.Promise;
//const db = mongoose.connection

//login
app.use(
    session({
        saveUninitialized: false, // saved new sessions
        resave: false, // do not automatically write to the session store
        //touchAfter: 60,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        secret: "passport-authentication",
        cookie: { httpOnly: true, maxAge: 3600000 } // configure when sessions expires
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, callback) => {
    console.log("SERIALIZADOR:");
    callback(null, user);
});

passport.deserializeUser(async(id, callback) => {
    console.log("DESERIALIZADOR");

    try {
        const user = await User.findById(id);

        if (!user) return callback({ message: "El usuario no existe" });

        return callback(null, user);
    } catch (error) {
        return callback(error);
    }
});

app.use(flash());
passport.use(
    new LocalStrategy({
            usernameField: "userauth",
            passwordField: "password",
            // Dado que no haremos uso de sesiones, es necesaria especificarlo en las distintas estrategias poniendolo a false. 
            session: true,
            passReqToCallback: true
        },
        async(req, userauth, password, next) => {
            console.log(userauth);
            console.log("LOCAL-STRATEGY");

            try {

                if (userauth.includes("@")) {
                    const email = userauth;
                    const user = await User.findOne({ email });

                    if (!user)
                        return next(null, false, { message: "El usuario no existe" });

                    if (!bcrypt.compareSync(password, user.password))
                        return next(null, false, { message: "La contraseña no es correcta" });

                    next(null, user);

                } else {
                    const username = userauth;
                    const user = await User.findOne({ username });

                    if (!user)
                        return next(null, false, { message: "El usuario no existe" });

                    if (!bcrypt.compareSync(password, user.password))
                        return next(null, false, { message: "La contraseña no es correcta" });

                    next(null, user);

                }


            } catch (error) {
                next(error);
            }
        }
    )
);

//Autenticacion por google
/* passport.use(new GoogleStrategy({
        returnURL: 'http://localhost:3000/auth/google/return',
        realm: 'http://localhost:3000/'
    },
    function(identifier, done) {
        User.findByOpenID({ openId: identifier }, function(err, user) {
            return done(err, user);
        });
    }
)); */
passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/authgoogle"
    },
    async function(accessToken, refreshToken, profile, done) {

        const email = profile.emails[0].value;
        const givenName = profile.name.givenName;
        const familyName = profile.name.familyName;

        //Tengo la duda de que si lo encuentra que siempre lo actualice o
        //lo separo en busca comprueba y si esta desactivado actualizalo
        const user = await User.findOneAndUpdate({ email }, { name: givenName, lastname: familyName, googleid: profile.id, googleauth: true }, { new: true, runValidators: true })

        if (user) {
            return done(null, user);
        } else {
            const newUser = new User({ email: email, name: givenName, lastname: familyName, googleid: profile.id, googleauth: true });
            const user = await newUser.save();
            return done(null, user);
        }

        /* try {
            const user = await User.findOneAndUpdate({ email }, { googleid: profile.id, googleauth: true }, { new: true, runValidators: true });
            console.log("USUARIO", user);
            next(null, user);
        } catch (err) {
            console.log("HOLA");
            next(err, null);
        } */
        //return done(err, user);
    }
));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger("dev"));



//rutas
app.use('/', indexRouter);

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