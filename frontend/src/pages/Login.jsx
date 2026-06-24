import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

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
      navigate("/upload");
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
    <motion.div
      className="min-h-[80vh] flex items-center justify-center px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#FCFAFF] shadow-xl border border-[#E6DDF0] p-8 rounded-none"
      >
        <h1 className="text-4xl font-bold mb-8 text-[#2D1E3E]">Login</h1>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-4 mb-4 text-sm">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-4 mb-4 rounded-none bg-white border-[#E6DDF0]"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-4 mb-6 rounded-none bg-white border-[#E6DDF0]"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#B497D6] text-white py-4 rounded-none hover:bg-[#9D7BC4] transition duration-300 disabled:bg-[#DCCBF0]"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#8E6CB3] hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default Login;