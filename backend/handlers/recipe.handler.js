const recipeModel = require("../models/recipe.model");
const userModel = require("../models/user.model");

const createRecipes = async (req, res) => {
    try {   
        const { title, instructions, Image, createdAt, ingredients} = req.body;
        const user = req.user;
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        const newRecipe = new recipeModel({ title, instructions, Image, createdBy: user.username, createdAt, ingredients});
        const recipe = await newRecipe.save();

        user.recipes.push(recipe._id);
        await user.save();
        res.status(201).json({ message: "Recipe added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "recipe creation failed" });
    }
};

const getRecipes = async (req, res) => {
  const recipes = await recipeModel.find();
  res.status(200).json(recipes);
};


module.exports = { createRecipes, getRecipes};
