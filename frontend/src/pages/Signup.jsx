import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { User, Mail, KeyRound, AlertCircle, CheckCircle } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      await API.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      setSuccess("Account created successfully! Redirecting to login...");
      setName("");
      setEmail("");
      setPassword("");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative">
      <div className="absolute w-80 h-80 bg-pink-300/10 blur-3xl rounded-full pointer-events-none animate-float" style={{ animationDelay: '1s' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <form
          onSubmit={handleSubmit}
          className="glass-card p-8 md:p-10 border border-white/70 shadow-2xl relative"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#2D1A47] mb-2">Create Account</h1>
            <p className="text-xs text-gray-500 font-medium">Get started with ResumeAI today</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-200 p-4 mb-6 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 text-emerald-600 border border-emerald-200 p-4 mb-6 text-xs flex items-center gap-2">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <div className="space-y-5 mb-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full glass-input pl-11 pr-4 py-4 text-sm font-medium text-gray-800"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input pl-11 pr-4 py-4 text-sm font-medium text-gray-800"
                required
              />
            </div>

            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4" />
              <input
                type="password"
                placeholder="Password (Min. 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input pl-11 pr-4 py-4 text-sm font-medium text-gray-800"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-purple text-white py-4 font-bold text-sm shadow-md hover:shadow-lg transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>

          <p className="mt-8 text-center text-xs text-gray-500 font-semibold">
            Already have an account?{" "}
            <Link to="/login" className="text-[#7C3AED] hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;