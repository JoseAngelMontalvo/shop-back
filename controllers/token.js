const jwt = require("jsonwebtoken");

function createToken(user) {

    const payload = {

        sub: user._id,
        exp: Date.now() + parseInt(process.env.JWT_EXPIRES),
        username: user.name
    };

    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
    return token;
}

module.exports = {
    createToken
};