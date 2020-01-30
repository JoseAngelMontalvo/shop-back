const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const User = require("../models/User");
const flash = require("connect-flash");
const mongoose = require("mongoose");

module.exports = app => {
    // 1.1 CONFIGURAMOS EN EXPRESS LA CONFIGURACIÓN DE PASSPORT

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

    // 1.2. DEFINIMOS LA ESTRATEGIA LOCAL.
    /* Esta estrategia servirá para establecer el login. 
    En ella comprobaremos que los datos de usuario son correctos (en este caso que exista y que la 
    contraseña sea validad) */

    passport.use(require("./strategies/localStrategy"));
    // 1.3. Tras esta función definiremos la ruta login (ir a ./routes/auth/login para continuar)

    passport.use(require("./strategies/googleStrategy"));

    app.use(flash());

    // 1.5. Tras esto, podemos proceder a autenticar las rutas (ir a ./routes/index)
};