import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { KeyRound, Mail, AlertCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await API.post("/api/auth/login", {
        email,
        password,
      });

      login(response.data.token, response.data.user);
      const temp = localStorage.getItem("tempResumeData");
      if (temp) {
        localStorage.setItem("resumeData", temp);
        localStorage.removeItem("tempResumeData");
        navigate("/dashboard");
      } else {
        navigate("/upload");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative">
      <div className="absolute w-80 h-80 bg-purple-300/20 blur-3xl rounded-full pointer-events-none animate-float" />
      
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
            <h1 className="text-3xl font-extrabold text-[#2D1A47] mb-2">Welcome Back</h1>
            <p className="text-xs text-gray-500 font-medium">Log in to manage and analyze your resumes</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 border border-red-200 p-4 mb-6 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-5 mb-6">
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
                placeholder="Password"
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
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-8 text-center text-xs text-gray-500 font-semibold">
            Don’t have an account yet?{" "}
            <Link to="/signup" className="text-[#7C3AED] hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;