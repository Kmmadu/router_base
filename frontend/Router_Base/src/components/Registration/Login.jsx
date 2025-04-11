import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "../../../supabaseClient";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Toast from "../Toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 10000);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showToast("All fields are required!", "error");
      return;
    }

    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else alert("Logged in successfully");

    showToast("Signup successful!", "success");
  };

  return (
    <motion.div
      className="min-h-screen flex justify-center items-center text-white bg-[#F5F5F5] relative overflow-hidden"
      //   style={{ background: "url(/endless-constellation.svg)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="bg-[rgba(30, 30, 30, .5)] p-8 rounded-lg shadow-lg shadow-[rgba(0,0,0,0.8)] w-96"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-[#000000] text-center mb-4">
          Login to Your Account
        </h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-transparent text-black rounded-lg border border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] "
          />
          <div className="relative w-full">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 pr-10 bg-transparent text-black rounded-lg border border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] "
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <motion.button
          className="w-full mt-6 py-3 bg-[#1a73e8] text-white font-semibold rounded-lg cursor-pointer shadow-lg hover:bg-opacity-80"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
        >
          Login
        </motion.button>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* Google Sign-in Button */}
        {/* <motion.button
          className="w-full mt-4 py-3 bg-white text-[#121212] font-semibold border rounded-lg flex justify-center items-center gap-2 shadow-lg hover:bg-gray-200 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/google-icon.jpeg" alt="Google" className="w-5 h-5" />
          Login with Google
        </motion.button> */}

        {/* Don't have an account? */}
        <p className="mt-4 text-center text-[#fbbc05]">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#1a73e8] font-bold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
