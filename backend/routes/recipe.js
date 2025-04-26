const express = require("express");
const router = express.Router();
const {authUser} =require("../middlewares/authMiddleware");
const { createRecipes, getRecipes} = require("../handlers/recipe.handler");

router.post("/create",authUser,createRecipes);
router.get("/", getRecipes);

module.exports = router;
