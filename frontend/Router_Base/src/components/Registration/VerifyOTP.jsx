import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../supabaseClient"; // Adjust import based on your project

const VerifyOTP = () => {
  const [otp, setOtp] = useState(Array(6).fill("")); // Array to store OTP digits
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const email = localStorage.getItem("pendingEmail"); // Retrieve stored email

  const handleVerifyOTP = async () => {
    setLoading(true);
    setError(null);

    const enteredOtp = otp.join(""); // Combine the OTP array into a single string

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: enteredOtp,
      type: "signup",
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      localStorage.removeItem("pendingEmail");
      navigate("/login");
    }
  };

  const handleChange = (index, value) => {
    // Allow only numeric input
    if (!/^\d*$/.test(value)) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to the next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to the previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg shadow-[rgba(0,0,0,0.8)] rounded-lg p-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Verify OTP
        </h1>
        <p className="text-gray-600 mb-4">
          Enter the OTP sent to <span className="font-medium">{email}</span>
        </p>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              className="w-12 h-12 text-center text-black border border-black rounded-lg focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={handleVerifyOTP}
          disabled={loading}
          className="w-full bg-blue-600 mt-4 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
