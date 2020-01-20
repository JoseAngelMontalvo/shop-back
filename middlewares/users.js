const User = require("../models/User");

module.exports = {
    newUser: async(req, res, next) => {

        const { username, email, password, confirmPassword, role } = req.body;
        let errors = [];

        if (!username.length) {
            errors.push({
                messageEmptyName: `Debe introducir un username`,
            });
        } else {
            const validationName = await User.findOne({ username });
            if (validationName)
                errors.push({
                    messageName: `El usuario con el nombre ${username}, ya existe`,
                });
        }

        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexEmail.test(email))
            errors.push({
                messageInvalidEmail: `La contraseña introducida no cumple los requisitos minimos`
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

        if (password != confirmPassword)
            errors.push({
                messageconfirmPassword: `Las contraseñas no coinciden`
            });

        const existRole = await process.env.ROLES_USER.split(" ").includes(role);
        if (!existRole)
            errors.push({
                messageconRole: `El role seleccionado no es valido`
            });

        if (errors.length) return res.status(422).json({ errors: errors, ok: false });

        next()
    },

    updateUser: async(req, res, next) => {
        const { id } = req.params;
        const { username, email, password, confirmPassword, role } = req.body;
        let errors = [];

        if (!id)
            return res.status(422).json({ messageNoId: "No se ha proporcionado un id", ok: false });

        const validateUserId = await User.findById(id);
        if (validateUserId === null)
            return res.status(422).json({ messageNoUser: `El usuario con el id ${id} no existe`, ok: false });

        if (!username.length) {
            errors.push({
                messageEmptyName: `Debe introducir un username`,
            });
        } else {
            const validationName = await User.findOne({ username });
            if (validationName)
                errors.push({
                    messageName: `El usuario con el nombre ${username}, ya existe`,
                });
        }

        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexEmail.test(email))
            errors.push({
                messageInvalidEmail: `El email introducido no es un email valido`
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

        if (password != confirmPassword)
            errors.push({
                messageconfirmPassword: `Las contraseñas no coinciden`
            });

        const existRole = await process.env.ROLES_USER.split(" ").includes(role);
        if (!existRole)
            errors.push({
                messageconRole: `El role seleccionado no es valido`
            });

        if (errors.length) return res.status(422).json({ errors: errors, ok: false });

        next()
    },

    deleteUser: async(req, res, next) => {
        const { id } = req.params;
        if (!id.length)
            return res.status(422).json({ messageNoId: "Debe introducir un id de Usuario", ok: false });

        const validateUserId = await User.findById(id);

        if (validateUserId === null)
            return res.status(422).json({ messageNoUser: `El usuario con el id ${id} no existe`, ok: false });

        next();
    },

    getAllUsers: async(req, res, next) => {
        const allUsers = await User.find();
        if (!allUsers.length)
            return res.status(422).json({ messageNoUsers: `No hay usuarios en la base de datos`, ok: false });
        next();

    },

    getUserById: async(req, res, next) => {
        const { id } = req.params;
        if (!id.length)
            return res.status(422).json({ messageNoId: "Debe introducir un id de Usuario", ok: false });

        const validateUserId = await User.findById(id);

        if (validateUserId === null)
            return res.status(422).json({ messageNoUser: `El usuario con el id ${id} no existe`, ok: false });

        next();
    },
    getUserByUsernameAndRole: async(req, res, next) => {
        const { username, role } = req.params;
        let errors = [];

        if (!username.length) {
            errors.push({
                messageEmptyName: `Debe introducir un username`,
            });
        } else {
            const validationName = await User.findOne({ username });
            if (validationName === null)
                errors.push({
                    messageName: `El usuario con el nombre ${username}, no existe`,
                });
        }

        if (!role.length) {
            errors.push({
                messageEmptyRole: `Debe introducir un role`,
            });
        } else {
            const existRole = await process.env.ROLES_USER.split(" ").includes(role);
            if (!existRole)
                errors.push({
                    messageconRole: `El role seleccionado no es valido`
                });
        }

        if (errors.length) return res.status(422).json({ errors: errors, ok: false });

        next()
    }

}