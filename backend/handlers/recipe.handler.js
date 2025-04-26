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

const getSearchRecipes = async (req, res) => {
    const { search } = req.query;
    const recipes = await recipeModel.find({
      title: { $regex: search, $options: "i" },
    });
    res.status(200).json(recipes);
}; 
  
const deleteRecipe = async (req, res) => {
    try {
      const { recipeId } = req.query;
      const user=req.user;
      const recipe = await recipeModel.findById(recipeId);
      if (!user || !recipe) {
        return res.status(404).json({ message: "user or Recipe not found" });
      }
      const createdby = recipe.createdBy;
      const username=user.username;
      if (username !== createdby) {
        return res.status(403).json({ message: "You are not authorized to delete this recipe" });
      }
      
      await recipeModel.findByIdAndDelete(recipeId);
      if (createdby) {
        await userModel.findOneAndUpdate(
          { username: createdby },            
          { $pull: { recipes: recipeId , bookmarkedRecipes: recipeId}},         
          { new: true }
        );
      }
      res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Recipe deletion failed" });
    }
};

module.exports = { createRecipes, getRecipes, getSearchRecipes, deleteRecipe };
