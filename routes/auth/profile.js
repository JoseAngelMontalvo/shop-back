const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");




router.get("/", (req, res) => {

    passport.authenticate("jwt", { session: false }, (error, userDB, info) => {

        if (error) res.status(500).json({ message: "Hubo un error en la obtencion del perfil usuario" });
        if (info) res.status(400).json({ message: info });
        const user = {
            "id": userDB._id,
            "name": userDB.name,
            "lastname": userDB.lastname,
            "email": userDB.email,
            "role": userDB.role
        }

        res.status(200).json({ user });

    })(req, res);
});

router.get('/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

module.exports = router;