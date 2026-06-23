import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <motion.div
      className="min-h-[80vh] flex items-center justify-center px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-md bg-[#FCFAFF] shadow-xl border border-[#E6DDF0] p-8 rounded-none">
        <h1 className="text-4xl font-bold mb-8 text-[#2D1E3E]">Signup</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-4 mb-4 rounded-none"
        />

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
          Signup
        </button>

        <p className="mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#8E6CB3]">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;