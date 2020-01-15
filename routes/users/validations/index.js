const isValidationNewUser = require("./newUser");


module.exports = async(user) => {
    await isValidationNewUser(user);
};