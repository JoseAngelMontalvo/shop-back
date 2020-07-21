const express = require('express');
const router = express.Router();
const passport = require("passport");

const usersRouter = require('./users');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const authRouter = require("./auth");
const shoppingCart = require("./shoppingcart");

router.use('/users', usersRouter);
router.use('/products/', productsRouter);
router.use('/categories', categoriesRouter);
router.use("/auth", authRouter);
router.use("/shoppingcart", shoppingCart);

const isAutenticated = (req, res, next) => {


    passport.authenticate("jwt", { session: false }, (error, user, info) => {

        if (error) return res.status(500).json({ message: "Hubo un error" });
        if (!user) return res.status(401).json({ message: "No autorizado" });

        req.user = user;

        next();

    })(req, res, next);
};


router.get("/", isAutenticated, (req, res, next) => {
    res.json({ message: "Autorizado" });
});

module.exports = router;