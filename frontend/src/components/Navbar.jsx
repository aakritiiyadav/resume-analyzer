import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="w-full px-4 md:px-8 py-5 bg-[#FCFAFF] shadow-md border-b border-[#E6DDF0]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl md:text-3xl font-bold text-[#8E6CB3] tracking-wide cursor-pointer hover:opacity-90">
            Resume Analyzer
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[#4B3B5C] font-medium">
          <Link to="/" className="hover:text-[#8E6CB3] transition duration-300">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/upload" className="hover:text-[#8E6CB3] transition duration-300">
                Upload
              </Link>

              <Link to="/dashboard" className="hover:text-[#8E6CB3] transition duration-300">
                Dashboard
              </Link>

              <Link to="/history" className="hover:text-[#8E6CB3] transition duration-300">
                History
              </Link>

              <span className="text-[#8E6CB3] text-sm font-normal">
                Hello, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="px-5 py-2 border border-[#B497D6] text-[#8E6CB3] rounded-none hover:bg-[#B497D6] hover:text-white transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 bg-[#B497D6] text-white rounded-none hover:bg-[#9D7BC4] transition duration-300"
            >
              Login / Signup
            </Link>
          )}
        </div>

        {/* Mobile Menu Button (Uses same log in/out logic conditionally) */}
        <div className="md:hidden flex items-center gap-4">
          {user && (
            <span className="text-[#8E6CB3] text-xs">
              {user.name}
            </span>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-xs border border-[#B497D6] text-[#8E6CB3]"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 text-xs bg-[#B497D6] text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;