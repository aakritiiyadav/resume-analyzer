import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <motion.div
      className="min-h-[80vh] flex items-center justify-center px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-md bg-[#FCFAFF] shadow-xl border border-[#E6DDF0] p-8 rounded-none">
        <h1 className="text-4xl font-bold mb-8 text-[#2D1E3E]">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 mb-4 rounded-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-4 mb-6 rounded-none"
        />

        <button className="w-full bg-[#B497D6] text-white py-4 rounded-none hover:bg-[#9D7BC4]">
          Login
        </button>

        <p className="mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#8E6CB3]">
            Signup
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;