const userModel = require("../models/user.model");
const {validationResult} = require('express-validator')

const register = async(req, res,next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }

  const { username, email, password } = req.body;
  const isUserExist = await userModel.findOne({email});
    
  if(isUserExist){
    return res.status(400).json({message:'User already exist'})
  }

  const hashedPassword = await userModel.hashPassword(password)

  const newuser = new userModel({ username, email, password:hashedPassword });
  const user = await newuser.save();
  const token = await user.generateAuthToken();
  return res.status(201).json({token,user});
};

const login =  async (req,res,next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const { username, password } = req.body;

  const user = await userModel.findOne({username}).select('+password');

  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }
  const isMatch = await user.comparePassword(password);
  if(!isMatch){
    return res.status(401).json({message:'Invalid email or password'});
  }
  const token = await user.generateAuthToken();
  res.cookie('token',token);
  return res.status(201).json({token,user});
};


module.exports = { register, login};