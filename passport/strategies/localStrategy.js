const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User");

// Sustituido bcrypt por bcrypjs para su implementación también en windows
const bcrypt = require("bcryptjs");

// La estrategía local recibe un primer parametro de configuración y un callback de verificación como segundo parametro
module.exports = new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        // Dado que no haremos uso de sesiones, es necesaria especificarlo en las distintas estrategias poniendolo a false. 
        session: false,
        //passReqToCallback: true
    },
    async(email, password, next) => {
        try {
            const userDB = await User.findOne({ email });
            if (!userDB)
                return next(null, false, { message: "El usuario no existe" });

            if (!bcrypt.compareSync(password, userDB.password))
                return next(null, false, { message: "La contraseña no es correcta" });

            //Antes de mandar el user podemos borrar campos como
            //delete user.password
            next(null, userDB);

        } catch (error) {
            next(error);
        }
    }
);