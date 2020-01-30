const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

// La estrategía local recibe un primer parametro de configuración y un callback de verificación como segundo parametro
module.exports = new LocalStrategy({
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

            const email = userauth;
            const user = await User.findOne({ email });

            if (!user)
                return next(null, false, { message: "El usuario no existe" });

            if (!bcrypt.compareSync(password, user.password))
                return next(null, false, { message: "La contraseña no es correcta" });

            next(null, user);


        } catch (error) {
            next(error);
        }
    }
);