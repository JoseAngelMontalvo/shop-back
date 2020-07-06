const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createToken } = require("./token")

module.exports = {
    emailToLowerCase: (req, res, next) => {
        req.body.email = req.body.email.toLowerCase();
        next();
    },
    signUp: async(req, res, ) => {

        const { name, lastName, email, password } = req.body;
        try {
            const hashPass = bcrypt.hashSync(password, 16);
            const newUser = new User({ name, lastName, email, password: hashPass, ownauth: true })
            const userDB = await newUser.save();
            const token = await createToken(userDB);
            const user = {
                "id": userDB._id,
                "name": userDB.name,
                "lastname": userDB.lastname,
                "email": userDB.email,
                "role": userDB.role
            }

            res.status(200).json({ user, token });
        } catch (error) {
            res.status(400).json({ message: "Internal server error, no user create" });
        }

    }

};