const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.get("/", (req, res) => res.render("auth/signup"));

router.post("/", async(req, res) => {
    const { username, password, email } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user) return res.render("auth/signup", { error: "El username ya existe" });
    } catch (error) {
        return res.render("auth/signup", { message: "Hubo un error" });
    }

    try {
        const user = await User.findOne({ email });
        if (user.username === null && user.password === null && user.googleauth === true) {
            const hashPass = bcrypt.hashSync(password, 10);
            const userDB = await User.findOneAndUpdate({ email }, { username: username, password: hashPass }, { new: true, runValidators: true })
            console.log("USER UPDATE BY LOGIN", userDB);
            return res.render("/", userDB);
        } else {
            return res.render("signup", { error: "El email ya existe" });
        }

    } catch (error) {
        return res.render("signup", { message: "Hubo un error" });
    }

    try {
        const hashPass = bcrypt.hashSync(password, 10);
        const user = new User({ username, password: hashPass, email });

        await user.save();

        res.redirect("/auth/login");
    } catch (error) {
        res.render("signup", { error: "Hubo un error" });
    }
});

router.get('/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/signup' }),
    function(req, res) {
        const { user } = req.user;
        console.log("USER SIGNUP", user);
        res.redirect('/');
    });

module.exports = router;