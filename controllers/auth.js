const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
    signUp: async(req, res, ) => {

        const { name, lastname, email, password } = req.body;
        try {

            const hashPass = bcrypt.hashSync(password, 16);
            const newUser = new User({ name, lastname, email, password: hashPass, ownauth: true })
            const userDB = await newUser.save();
            res.status(200).json(userDB);

        } catch (error) {
            res.status(400).json({ message: "Internal server error, no user create" });
        }

    }

};