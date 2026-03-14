import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup logic
export const signup = async (req,res) => {
  const { full_name, email, password } = req.body;

  if(!full_name || !email || !password)
    return res.status(400).json({ message:"All fields required" });

  if(password.length < 8)
    return res.status(400).json({ message:"Password must be at least 8 characters" });

  const existingUser = await User.findOne({email});
  if(existingUser) return res.status(400).json({ message:"Email already exists" });

  const user = await User.create({ full_name, email, password });

  res.status(201).json({
    message:"User created successfully",
    user:{ id:user._id, full_name:user.full_name, email:user.email }
  });
};


// Login logic
export const login = async (req,res) => {
  const {email,password} = req.body;

  const user = await User.findOne({email});
  if(!user) return res.status(400).json({message:"Invalid credentials"});

  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

  const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});

  res.cookie("token",token,{httpOnly:true,maxAge:3600000});
  res.json({message:"Login successful"});
};

// Logout logic
export const logout = (req,res) => {
  res.clearCookie("token");
  res.json({message:"Logged out successfully"});
};

// Middleware to protect routes
export const protect = (req,res,next) => {
  const token = req.cookies?.token;
  if(!token) return res.status(401).json({message:"Not authorized"});

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch(error){
    return res.status(401).json({message:"Invalid token"});
  }
};

// Dashboard logic
export const dashboard = (req,res) => {
  res.json({message:"Welcome to dashboard", user:req.user});
};
