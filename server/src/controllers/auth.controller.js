import User from "../models/auth.model.js";
import Student from "../models/student.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import session from "express-session";
dotenv.config({
  path: "../.env",
});

// *Register
const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    rollNo,
    department,
    year,
    cgpa,
    phone,
  } = req.body;
  console.log(req.body)

  const existingUser = await User.findOne({ email });
  const existingStudent = await Student.findOne({rollNo})

  if (existingUser) {
   throw new ApiError(400,"User already exists")
  }

   if (existingStudent) {
   throw new ApiError(400 , "Student already exists")
  }

  let session
  try {
   
   

   session = await mongoose.startSession()
    session.startTransaction()
     const user = await User.create([{ name, email, password }],{session});
      const student = await Student.create([{
      user: user[0]._id,
      rollNo,
      department,
      year,
      cgpa,
      phone,
    }],{session});
    await session.commitTransaction();
    
    


    if (!user) {
     throw new ApiError(400 ,"User not registered")
    }
    if (!student) {
      throw new ApiError(400 ,"Student not registered")
    }
    res.status(201).json(
       new ApiResponse(
        201,
        {
            user: user,
            student: student
        },
        "User registered successfully"
    )
    );

    console.log(user);
  } catch (error) {
     if (session) {
      await session.abortTransaction();
    }
    res.status(500).json({
      success: false,
      message: "error in signing up!!",
      error: error.message,
    });
  }
};

// *Login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(401 ,"Invalide email or password")
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(401 ,"Invalide email or password")
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const cookieOption = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOption);
    return res.status(200).json(
      ApiResponse(200,user,"Login Successfully")
    );
    console.log(user);
  
})

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("token", "", {});
  return res.status(200).json(
    ApiResponse(200 , "Logout Successfully")
  );
})

export { registerUser, loginUser, logoutUser };
