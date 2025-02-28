import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../../../supabaseClient";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
      name,
    });
    if (error) {
      setError(error.message);
    } else alert("Check your email for confirmation");
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
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-transparent text-black rounded-lg border border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] shadow-[0px_0px_8px_rgba(0,0,0,0.5)]"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-transparent text-black rounded-lg border border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] shadow-[0px_0px_8px_rgba(0,0,0,0.5)]"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-transparent text-black rounded-lg border border-[#1a73e8] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] shadow-[0px_0px_8px_rgba(0,0,0,0.5)]"
          />
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
        {error && <p>{error}</p>}

        {/* Google Sign-in Button */}
        <motion.button
          className="w-full mt-4 py-3 bg-white text-[#121212] font-semibold border rounded-lg flex justify-center items-center gap-2 shadow-lg cursor-pointer hover:bg-gray-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/google-icon.jpeg" alt="Google" className="w-5 h-5" />
          Sign Up with Google
        </motion.button>

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
