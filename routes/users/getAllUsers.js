const Express = require('express');
const router = Express.Router();

const userController = require("../../controllers/users");

router.get("/", userController.getAllUsers);



module.exports = router;