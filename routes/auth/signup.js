const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../../controllers/auth");
const validate = require("../../middlewares/auth");

router.get("/", (req, res) => res.render("auth/signup"));

router.post("/", validate.signUp, userController.signUp);



router.get('/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));


module.exports = router;