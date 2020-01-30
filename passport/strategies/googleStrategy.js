require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../../models/User");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

module.exports = new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/authgoogle"
    },
    async function(accessToken, refreshToken, profile, done) {

        const email = profile.emails[0].value;
        const givenName = profile.name.givenName;
        const familyName = profile.name.familyName;

        //Tengo la duda de que si lo encuentra que siempre lo actualice o
        //lo separo en busca comprueba y si esta desactivado actualizalo
        const user = await User.findOneAndUpdate({ email }, { googleid: profile.id, googleauth: true }, { new: true, runValidators: true })

        if (user) {
            return done(null, user);
        } else {
            const newUser = new User({ email: email, name: givenName, lastname: familyName, googleid: profile.id, googleauth: true });
            const user = await newUser.save();
            return done(null, user);
        }


    }
);