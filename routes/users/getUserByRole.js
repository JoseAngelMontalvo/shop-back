const Express = require('express');
const router = Express.Router();

const userController = require("../../controllers/users");

router.get("/:name/:role", userController.getUserByRole);


module.exports = router;