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
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));


router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/signup' }),
    function(req, res) {
        const { user } = req.user;
        console.log("LOGIN", user);
        res.redirect('/');
    });




module.exports = router;