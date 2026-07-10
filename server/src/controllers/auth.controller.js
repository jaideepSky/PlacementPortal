
import User from "../models/auth.model.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config({
  path: "../.env"
})

// *Register
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  const existingUser = await User.findOne({ email });

  if (!name || !email || !password) {
    return res.status(404).json({
      message: "All fields are required",
    });
  }

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists !!",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }
  try {
    const user = await User.create({ name, email, password });
    if (!user) {
      return res.status(400).json({
        message: "User not registered",
      });
    }
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
    console.log(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error in signing up!!",
      error: error.message,
    });
  }
};

// *Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json({
      message: "All fields are required",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user ) {
       return res.status(401).json({
        message: "Invalide email or password"
       })
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
       return res.status(400).json({
        message: "Invalide email or password"
       })
    }

    const token = jwt.sign({id:user._id , name:user.name},process.env.JWT_SECRET , {expiresIn:"1h"})

   const cookieOption = {
        httpOnly : true, 
        secure : true,
        maxAge : 24*60*60*1000
      }
      res.cookie("token",token , cookieOption)
      res.status(200).json({
        success : true,
        message : "Login Successfull",
        token,
        user:{
          id : user._id,
          name : user.name,
          role : user.role
        }
      })
    console.log(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error  in login!!",
      error: error.message,
    });
   
  }
};

const logoutUser = async (req ,res) => {
   res.cookie("token",'',{})
  return res.status(200).json({
    success:true,
    message:"Logout Successfully"
  })
};

export { registerUser, loginUser, logoutUser };
