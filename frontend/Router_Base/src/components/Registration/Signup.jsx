import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../../supabaseClient";
import Toast from "../Toast";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 10000);
  };

  const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      showToast("All fields are required!", "error");
      return;
    }

    if (!isValidEmailFormat(email)) {
      showToast("Invalid email format!", "warning");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: "http://localhost:4150/profile", // Redirect to profile page after email confirmation
        },
      });

      if (error) {
        setError(error.message);
        showToast("Signup failed. Please try again.", "error");
      } else {
        showToast("Signup successful! Redirecting to profile...", "success");

        // Redirect to profile page immediately after signup
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      setError(error.message);
      showToast("An unexpected error occurred.", "error");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex justify-center items-center text-white bg-[#f5f5f5] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="p-8 rounded-lg shadow-lg w-96  bg-[#f5f5f5] shadow-[rgba(0,0,0,0.8)]"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-[#1a73e8] text-center mb-4 glow">
          Create Account
        </h2>

        {/* Input Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div className="relative w-full">
            <label
              className={`absolute left-3 transition-all duration-200 ${
                isNameFocused || name
                  ? "top-1 text-xs text-[#1a73e8]"
                  : "top-4 text-gray-400 text-base"
              }`}
            >
              Username
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full p-3 pt-5 bg-transparent text-black rounded-lg border border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] shadow-[0px_0px_8px_rgba(0,0,0,0.5)]"
              onFocus={() => setIsNameFocused(true)}
              onBlur={() => setIsNameFocused(false)}
            />
          </div>

          {/* Email */}
          <div className="relative w-full">
            <label
              className={`absolute left-3 transition-all duration-200 ${
                isEmailFocused || email
                  ? "top-1 text-xs text-[#1a73e8]"
                  : "top-4 text-gray-400 text-base"
              }`}
            >
              Email
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full p-3 pt-5 bg-transparent text-black rounded-lg border border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] shadow-[0px_0px_8px_rgba(0,0,0,0.5)]"
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
          </div>

          {/* Password */}
          <div className="relative w-full">
            <label
              className={`absolute left-3 transition-all duration-200 ${
                isPasswordFocused || password
                  ? "top-1 text-xs text-[#1a73e8]"
                  : "top-4 text-gray-400 text-base"
              }`}
            >
              Password
            </label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              className="w-full p-3 pt-5 bg-transparent text-black rounded-lg border border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] shadow-[0px_0px_8px_rgba(0,0,0,0.5)]"
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />

            <button
              type="button"
              className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Signup Button */}
        <motion.button
          className="w-full mt-6 py-3 bg-[#1a73e8] text-darkBg font-semibold rounded-lg cursor-pointer hover:bg-opacity-80 "
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignUp}
        >
          Sign Up
        </motion.button>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        {error && <p>{error}</p>}

        {/* Already have an account */}
        <p className="mt-4 text-center text-[#fbbc05]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#1a73e8] font-bold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
