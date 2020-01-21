const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
    //   const error = req.flash("error")[0];

    res.render("auth/login", { error: req.flash("error")[0] });
});

router.post(
    "/",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureFlash: true,
        passReqToCallback: true
    })
);

router.get('/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });




module.exports = router;