const User = require("../models/User");

module.exports = {
    signUp: async(req, res, next) => {

        const { name, lastname, email, password, confirmpassword } = req.body;
        let errors = [];

        if (!name.length) {
            errors.push({
                messageEmptyName: `Debe introducir un username`,
            });
        }
        if (!lastname.length) {
            errors.push({
                messageEmptyName: `Debe introducir un lastname`,
            });
        }
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexEmail.test(email))
            errors.push({
                messageInvalidEmail: `El email introducido no es correcto`
            });

        const validationEmail = await User.findOne({ email });
        if (validationEmail && validationEmail.ownauth == true)
            errors.push({
                messageEmail: `El usuario con el email ${email}, ya existe`
            });

        if (validationEmail && validationEmail.googleauth == true && validationEmail.ownauth == false) {
            next(validationEmail);
        }


        const regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
        if (!regex.test(password))
            errors.push({
                messagePasword: `La contraseña introducida no cumple los requisitos minimos`
            });

        if (password != confirmpassword)
            errors.push({
                messageconfirmPassword: `Las contraseñas no coinciden`
            });

        if (errors.length) return res.status(422).json({ errors: errors, ok: false });

        next()
    }

}