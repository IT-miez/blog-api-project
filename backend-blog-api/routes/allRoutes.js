const express = require("express");
const router = express.Router();

// Requires for all controllers
const user_controller = require("../controllers/userController");

// ALL ROUTES
// GET home page.
router.get("/", user_controller.index);



module.exports = router;
