import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

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
        <h1 className="text-4xl font-bold mb-8 text-[#2D1E3E]">Signup</h1>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-4 mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 border border-green-200 p-4 mb-4 text-sm">
            {success}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-4 mb-4 rounded-none bg-white border-[#E6DDF0]"
          required
        />

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
          {loading ? "Registering..." : "Signup"}
        </button>

        <p className="mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#8E6CB3] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default Signup;