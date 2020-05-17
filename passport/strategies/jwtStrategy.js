require("dotenv").config();
const User = require("../../models/User");

// Sustituido bcrypt por bcrypjs para su implementación también en windows
const bcrypt = require("bcryptjs");

// Importamos la estrategia json web token
const JwtStrategy = require("passport-jwt").Strategy;

// Importamos la funcionalidad para descomoprimir el token. 
const ExtractJwt = require("passport-jwt").ExtractJwt;

// DEFINIMOS LA CONFIGURACIÓN DE LA ESTRATEGIA JWT
const opts = {
    // Especificamos de donde queremos extraer el token. En este caso de los headers como Bearer token
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // Señalamos el SECRET para comprobar que el token es correcto.
    secretOrKey: process.env.JWT_SECRET
};


// La estrategía jwt, al igual que la local, recibe un primer parametro de configuración y un callback de verificación como segundo parametro
// en este caso, el objeto de configuración lo hemos declarado en la constante opts anterior
module.exports = new JwtStrategy(opts, async(tokenPayload, next) => {
    console.log(`Estrategia jwt. Información recibida: token ${tokenPayload}`)

    // El callback de verificación, en este caso, recibe el token en formato json. 
    try {
        // Buscamos el usuario por id accediendo al atributo sub del token que hemos definido en el login
        const user = await User.findOne({ _id: tokenPayload.sub });

        // si el usuario no existe enviamos como tercer parametro (info) el mensaje de error, 
        // el usuario (segundo parametro) a false
        // y el error (primer parametro) a null
        if (!user) next(null, false, { message: "invalid token" });

        // si el usuario existe, enviamos el primer parametro a null y el segundo con el usuario
        next(null, user);
    } catch (error) {
        //En caso de error enviamos el error como primer parametro
        next(error);
    }
})