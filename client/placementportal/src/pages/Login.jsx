import React from 'react'
import { useState } from "react"
import { useForm } from "react-hook-form"                           // ← import
import { Link, useNavigate } from "react-router-dom"
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"             // ← redux
import { login, clearError } from "../redux/slices/authSlice.js"    

const adminUser = {
  id: "admin1",
  name: "TPO Admin",
  email: "tpo@college.edu",
  role: "admin",
};

function Login() {
  
  return (
    <>
    
    
    </>
    
  )
}

export default Login