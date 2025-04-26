const express = require("express");
const router = express.Router();
const {authUser} =require("../middlewares/authMiddleware");
const { register,login,profile} = require("../handlers/auth.handler");

router.post("/register", register);
router.post("/login", login);
router.get("/profile",authUser,profile);

module.exports = router;