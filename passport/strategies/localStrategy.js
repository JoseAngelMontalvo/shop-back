const LocalStrategy = require("passport-local").Strategy;
const User = require("../../models/User");

const bcrypt = require("bcryptjs");

module.exports = new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        session: false,
    },
    async(email, password, next) => {
        try {
            const userDB = await User.findOne({ email });
            if (!userDB)
                return next(null, false, { message: "El usuario no existe" });

            if (!bcrypt.compareSync(password, userDB.password))
                return next(null, false, { message: "La contraseña no es correcta" });

            next(null, userDB);

        } catch (error) {
            next(error);
        }
    }
);