const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ingredients: {
    type: [String],
    required: true,
  },
});

const recipeModel = mongoose.model("Recipe", recipeSchema);

module.exports = recipeModel;
