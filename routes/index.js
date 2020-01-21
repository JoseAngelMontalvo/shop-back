const express = require('express');
const router = express.Router();
const ensureLoggin = require("connect-ensure-login");

const usersRouter = require('./users');
const authRouter = require("./auth");

router.use('/users', usersRouter);
router.use("/auth", authRouter);

router.get("/", ensureLoggin.ensureLoggedIn("/auth/login"), function(
    req,
    res,
    next
) {
    res.render("index", { user: req.user });
});




module.exports = router;