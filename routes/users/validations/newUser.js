const User = require("../../../models/User");

module.exports = async(user) => {
    const { username, email, password, confirmPassword } = user;
    let errors = [];

    if (password != confirmPassword)
        errors.push({
            status: 409,
            messageName: `Las contraseñas no coinciden`,
            ok: false
        });


    const validationName = await User.findOne({ username });
    if (validationName)
        errors.push({
            status: 409,
            messageName: `El usuario con el nombre ${username}, ya existe`,
            ok: false
        });

    const validationEmail = await User.findOne({ email });
    if (validationEmail)
        errors.push({
            status: 409,
            messageEmail: `El usuario con el email ${email}, ya existe`,
            ok: false
        });

    const regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    if (!regex.test(password))
        errors.push({
            status: 409,
            messagePasword: `La contraseña introducida no cumple los requisitos minimos`,
            ok: false
        });
    throw errors;
};