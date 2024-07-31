const express = require("express");
const {signupUser} = require("../controller/SignupController");

const router = express.Router();

router.post("/register", signupUser);

module.exports = router;