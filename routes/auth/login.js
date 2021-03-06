const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { createToken } = require("../../controllers/token");
const { emailToLowerCase } = require("../../controllers/auth");

router.get("/", (req, res) => {
    res.render("auth/login", { error: req.flash("error")[0] });
});

router.post("/", emailToLowerCase, (req, res) => {
    passport.authenticate("local", { session: false }, (error, userDB, info) => {

        if (error) res.status(500).json({ message: "Hubo un error" });

        if (info) res.status(400).json({ message: info });

        const token = createToken(userDB);
        const user = {
            "id": userDB._id,
            "name": userDB.name,
            "lastname": userDB.lastname,
            "email": userDB.email,
            "role": userDB.role
        }

        res.status(200).json({ user, token });
    })(req, res);
});

router.get('/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

module.exports = router;