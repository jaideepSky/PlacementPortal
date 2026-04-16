import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Hash,
  Building,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { clearError, register } from "../redux/slices/authSlice";

const departments = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil",
  "Chemical",
];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userdata, loading, error } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      rollNo: "",
      department: "",
      year: "",
      cgpa: "",
      phone: "",
    }
  });
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState(1); // initial step 1
  const password = watch("password"); // ← watch password for confirm match

  const handleStep1 = async () => {
    dispatch(clearError());
    const valid = await trigger(["name", "email", "password"]);
    if (valid) {
      setStep(2);
    }
  };

  const onSubmit = (data) => {
    dispatch(clearError());
    dispatch(
      register({ name: data.name, email: data.email, password: data.password }),
    );
  };

  // redirect after register
  if (userdata) {
    navigate("/student/dashboard");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-700 shadow-lg mb-4">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Student Registration
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Join the Placement Cell Portal
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                  s < step
                    ? "bg-green-500 text-white"
                    : s === step
                      ? "bg-blue-700 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {s < step ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              <span
                className={`text-xs font-medium ${s === step ? "text-blue-700" : "text-gray-400"}`}
              >
                {s === 1 ? "Account Info" : "Academic Info"}
              </span>
              {s < 2 && (
                <div
                  className={`w-8 h-0.5 ${s < step ? "bg-green-400" : "bg-gray-200"}`}
                ></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* ← single form wraps both steps */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-gray-800 mb-1">
                  Personal Information
                </h2>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      {...register("name", {
                        required: "Full name is required",
                      })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      placeholder="your.rollno@college.edu"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
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
                      type={showPass ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPass ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      placeholder="Repeat your password"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (val) =>
                          val === password || "Passwords do not match", // ← compare with password
                      })}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Redux Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                {/* Continue Button — type button not submit */}
                <button
                  type="button"
                  onClick={handleStep1}
                  className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-all shadow-md shadow-blue-200"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-base font-semibold text-gray-800 mb-1">
                  Academic Information
                </h2>

                {/* Roll No */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Roll Number
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. CS2021001"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      {...register("rollNo", {
                        required: "Roll number is required",
                      })}
                    />
                  </div>
                  {errors.rollNo && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.rollNo.message}
                    </p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Department
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none"
                      {...register("department", {
                        required: "Department is required",
                      })}
                    >
                      <option value="">Select Department</option>
                      {departments.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.department && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.department.message}
                    </p>
                  )}
                </div>

                {/* Year + CGPA */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Year
                    </label>
                    <select
                      className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none"
                      {...register("year", { required: "Year is required" })}
                    >
                      <option value="">Year</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    {errors.year && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.year.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      CGPA
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.01"
                      placeholder="e.g. 8.5"
                      className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      {...register("cgpa", {
                        required: "CGPA is required",
                        min: { value: 0, message: "Min CGPA is 0" },
                        max: { value: 10, message: "Max CGPA is 10" },
                      })}
                    />
                    {errors.cgpa && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.cgpa.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter valid 10-digit number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Redux Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all text-sm"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-all shadow-md shadow-blue-200 disabled:opacity-60"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-700 font-medium hover:text-blue-900"
          >
            Sign in
          </Link>
        </p>
        <p className="text-center text-sm text-gray-400 mt-2">
          <Link to="/" className="hover:text-gray-600">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
