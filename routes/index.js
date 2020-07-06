const express = require('express');
const router = express.Router();
const passport = require("passport");

const usersRouter = require('./users');
const productsRouter = require('./products');
const categoriesRouter = require('./categories');
const authRouter = require("./auth");
const shoppingCart = require("./shoppingcart");

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);
router.use("/auth", authRouter);
router.use("/shoppingcart", shoppingCart);



// 5. Definimos el middlewere que ire en la ruta a autenticar (Esto deberá estar en otro archivo)
const isAutenticated = (req, res, next) => {
    console.log("HOLA")
        // definimos el método de autenticación como jwt, la sesión a false y el callback para gestionar la información de la estrategia jwt
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
        console.log(`Autenticación de estrategia jwt. Información recibida: error: ${error}, user: ${user}, info: ${info}`)

        // comprobamos si hay error interno
        if (error) return res.status(500).json({ message: "Hubo un error" });

        // Comprobamos si está autorizado
        if (!user) return res.status(401).json({ message: "No autorizado" });

        // Iniciamos el usuario en el objeto req para poder acceder en la función handler o principal
        req.user = user;
        // Finalizamos el middleware y pasamos a función principal (o a siguiente middleware en caso de haberlo)
        next();

        //Ejecutamos la función con req, res, next como parametros
    })(req, res, next);
};

// PAsamos el middleware como segundo parametro y desarrollamos la lógica de la función principal de la ruta index
router.get("/", isAutenticated, (req, res, next) => {
    console.log("HOLA")
        // en caso de entrar a la función, quiere decir que el usuario esta autorizado
    res.json({ message: "Autorizado" });
});

module.exports = router;