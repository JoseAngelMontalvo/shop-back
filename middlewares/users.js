const User = require("../models/User");

module.exports = {
    newUser: async(req, res, next) => {
        const { name, email, password, confirmPassword } = req.body;
        let errors = [];

        if (password != confirmPassword)
            errors.push({
                messageconfirmPassword: `Las contraseñas no coinciden`
            });


        const validationName = await User.findOne({ name });
        if (validationName)
            errors.push({
                messageName: `El usuario con el nombre ${name}, ya existe`,
            });

        const validationEmail = await User.findOne({ email });
        if (validationEmail)
            errors.push({
                messageEmail: `El usuario con el email ${email}, ya existe`
            });

        const regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
        if (!regex.test(password))
            errors.push({
                messagePasword: `La contraseña introducida no cumple los requisitos minimos`
            });
        if (errors.length) return res.status(422).json({ errors: errors, ok: false });

        next()
    },
    updateUser: {}


}