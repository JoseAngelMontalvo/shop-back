const User = require("../models/User");
const bcrypt = require("bcryptjs");
const isValidationNewUser = require("../routes/users/validations");

module.exports = {
    newUser: async(req, res) => {

        const user = req.body;
        const { name, email, password } = req.body;
        try {

            //await isValidationNewUser(user);

            /* const validationName = await User.findOne({ name });
            if (validationName) return res.status(409).json({ message: `El usuario con el nombre ${name}, ya existe` });

            const validationEmail = await User.findOne({ email });
            if (validationEmail) return res.status(409).json({ message: `El usuario con el email ${email}, ya existe` });

            const regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
            if (!regex.test(password)) return res.status(409).json({ message: `El usuario con el email ${email}, ya existe` }); */

            const hashPass = bcrypt.hashSync(password, 10);
            const newUser = new User({ name, email, password: hashPass })
            const userDB = await newUser.save();
            //console.log(userDB);
            res.status(200).json(userDB);

        } catch (error) {

            console.log(error.messageEmail);

            const errorMessages = error.map((err) => {
                return err.message;
            })

            if (error[0].status) res.status(error[0].status).json(error);
            else res.status(500).json({ message: "Internal server error" });
        }

        try {
            console.log("El hilo sigue")
        } catch (e) {

        }
    }


};