import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form"; // ← import
import { Link, useNavigate } from 'react-router';
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux"; // ← redux
// import { login, clearError } from "../redux/slices/authSlice.js";


function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading , userdata} = useSelector((state) => state.auth);
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState("student");
  const { register, handleSubmit, setValue,formState:{errors} } = useForm({
    defaultValues: { email: "", password: "" },
  });
   
  const onSubmit = (data)=>{
    dispatch(clearError())
      dispatch(login({email:data.email , password:data.password })) // here loading handle in redux slice
  }

   // redirect based on role from redux
  if(userdata){
    if(userdata.role == "admin"){
      navigate("/admin/dashboard")
    }
      if(userdata.role == "student"){
      navigate("/student/dashboard")
    }
    
  }

  // fill demo data
  const fillDemoData = (type)=>{
    if(type === 'admin'){
      setValue("email",'tpo@college.edu')
      setValue('password', 'admin123')
      setrole('admin')
    }
    else {
      setValue('email', 'aryan@college.edu')
      setValue('password', 'student123')
      setRole('student')
    }
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-700 shadow-lg mb-4">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to College Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to Placement Cell</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

          {/* Role Toggle */}
          <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                role === 'student' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Student Login
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                role === 'admin' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              TPO / Admin Login
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder={role === 'admin' ? 'tpo@college.edu' : 'rollno@college.edu'}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email'
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Redux Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button — loading from redux */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-blue-200"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400 mb-3 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" /> Demo Credentials
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => fillDemoData('student')}
                className="text-xs bg-blue-50 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors font-medium"
              >
                Fill Student Demo
              </button>
              <button
                onClick={() => fillDemoData('admin')}
                className="text-xs bg-indigo-50 text-indigo-700 py-2 px-3 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
              >
                Fill Admin Demo
              </button>
            </div>
          </div>

        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-700 font-medium hover:text-blue-900">
            Register here
          </Link>
        </p>
        <p className="text-center text-sm text-gray-400 mt-2">
          <Link to="/" className="hover:text-gray-600">← Back to Home</Link>
        </p>

      </div>
    </div>
  )
}

export default Login;
