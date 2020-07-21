const passport = require("passport");
const User = require("../models/User");
const flash = require("connect-flash");

module.exports = app => {

    app.use(passport.initialize());

    passport.use(require("./strategies/localStrategy"));
    passport.use(require("./strategies/jwtStrategy"));
    passport.use(require("./strategies/googleStrategy"));

    app.use(flash());

};