const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const express = require('express');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    recipes: [{
        type: mongoose.Schema.ObjectId,
        ref: "Recipe",
        required: false,
    }],
    bookmarkedRecipes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Recipe'
    }]
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword =async function(password){
    return await bcrypt.hash(password,10);
}
  
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
