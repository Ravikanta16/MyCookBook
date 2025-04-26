const express = require("express");
const router = express.Router();
const {authUser} =require("../middlewares/authMiddleware");
const { createRecipes, getRecipes, getSearchRecipes, deleteRecipe} = require("../handlers/recipe.handler");
const { bookmarkRecipe, unbookmarkRecipe, getBookmarkedRecipes } = require("../handlers/bookmark.handler");

router.post("/create",authUser,createRecipes);
router.get("/", getRecipes);
router.get("/search",getSearchRecipes);
router.delete("/delete/",authUser,deleteRecipe)
router.post("/bookmark",authUser,bookmarkRecipe);
router.post("/unbookmark",authUser,unbookmarkRecipe);
router.get("/bookmarked",authUser,getBookmarkedRecipes);

module.exports = router;
