const express = require('express');
const router = express.Router();
const ensureLoggin = require("connect-ensure-login");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});



const usersRouter = require('./users');
const productsRouter = require('./products');
const authRouter = require("./auth");

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use("/auth", authRouter);

router.get("/", ensureLoggin.ensureLoggedIn("/auth/login"), function(
    req,
    res,
    next
) {
    console.log("USUARIO" + req.user)
    res.render("index", { user: req.user });
});




module.exports = router;