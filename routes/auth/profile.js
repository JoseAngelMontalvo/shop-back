const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");



// 3. Definimos la ruta login para devolver el token al usuario
router.get("/", (req, res) => {

    // procedemos a autenticar la estrategia local 
    passport.authenticate("jwt", { session: false }, (error, userDB, info) => {
        console.log(`existetoken valido. Información recibida: error: ${error}, user: ${userDB}, info: ${info}`)

        // Si hay un error de servidor, envíamos un 500 
        if (error) res.status(500).json({ message: "Hubo un error en la obtencion del perfil usuario" });

        // Si hay info, el error será del cliente, por lo que lo devolvemos con un 400
        if (info) res.status(400).json({ message: info });
        const user = {
                "id": userDB._id,
                "name": userDB.name,
                "lastname": userDB.lastname,
                "email": userDB.email,
                "role": userDB.role
            }
            //Devolvemos el usuario y el token 
        res.status(200).json({ user });
        // Ejecutamos la función pasandole los parametros req y res 
    })(req, res);
});

router.get('/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));

module.exports = router;