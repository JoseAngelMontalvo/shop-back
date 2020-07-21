require("dotenv").config();
const User = require("../../models/User");

const bcrypt = require("bcryptjs");

const JwtStrategy = require("passport-jwt").Strategy;

const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = new JwtStrategy(opts, async(tokenPayload, next) => {

    try {

        const userDB = await User.findOne({ _id: tokenPayload.sub });
        if (!userDB) next(null, false, { message: "invalid token" });

        next(null, userDB);
    } catch (error) {
        next(error);
    }
})