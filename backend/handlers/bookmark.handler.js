const express = require('express');
const recipeModel = require("../models/recipe.model");
const userModel = require("../models/user.model");

const bookmarkRecipe = async (req,res) => {
    const {recipeId} = req.body;
    const user = req.user;
    const recipe = await recipeModel.findById(recipeId);
    if (!user || !recipe) {
        throw new Error('User or recipe not found');
    }
    user.bookmarkedRecipes.push(recipeId);
    await user.save();
    res.status(201).json({ message: "Recipe bookedmark successfully" });
};

const unbookmarkRecipe = async (req, res) => {
    const {recipeId} = req.body;
    const user = req.user;
    user.bookmarkedRecipes = user.bookmarkedRecipes.filter(id => id.toString() !== recipeId);
    await user.save();
    res.status(201).json({ message: "Recipe unbookmarked successfully" });
};

const getBookmarkedRecipes = async (req,res) => {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    if (!user.bookmarkedRecipes || user.bookmarkedRecipes.length === 0) {
        return res.status(200).json([]);
    }

    const recipes = await recipeModel.find({ _id: { $in: user.bookmarkedRecipes } });
    res.status(200).json(recipes);
};

module.exports = {bookmarkRecipe, unbookmarkRecipe, getBookmarkedRecipes};