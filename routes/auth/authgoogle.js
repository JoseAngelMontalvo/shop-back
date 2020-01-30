const express = require("express");
const router = express.Router();
const passport = require("passport");


router.get('/',
    passport.authenticate('google', { failureRedirect: '/auth/signup' }),
    (req, res) => {
        //const user = req.user;
        res.redirect("/");
    });




module.exports = router;