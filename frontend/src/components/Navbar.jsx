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
    <nav className="sticky top-0 z-50 w-full px-4 md:px-8 py-4 bg-white/60 backdrop-blur-lg border-b border-[#E6DDF0]/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-300">
            RA
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gradient cursor-pointer">
            ResumeAI
          </h1>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[#4B3B5C] font-semibold text-sm">
          <Link to="/" className="hover:text-[#7C3AED] transition duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#7C3AED] hover:after:w-full after:transition-all after:duration-300">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/upload" className="hover:text-[#7C3AED] transition duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#7C3AED] hover:after:w-full after:transition-all after:duration-300">
                Upload
              </Link>

              <Link to="/dashboard" className="hover:text-[#7C3AED] transition duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#7C3AED] hover:after:w-full after:transition-all after:duration-300">
                Dashboard
              </Link>

              <Link to="/history" className="hover:text-[#7C3AED] transition duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#7C3AED] hover:after:w-full after:transition-all after:duration-300">
                History
              </Link>

              <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                <span className="text-[#8E6CB3] font-normal text-xs bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100">
                  👋 {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition duration-300 text-xs font-bold"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2.5 bg-gradient-purple text-white shadow-sm hover:shadow-md transition duration-300 text-xs font-bold"
            >
              Login / Signup
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {user ? (
            <>
              <span className="text-[#8E6CB3] text-xs font-medium bg-purple-50 px-2.5 py-1 rounded-full">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs border border-[#7C3AED] text-[#7C3AED] font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1.5 text-xs bg-gradient-purple text-white font-bold"
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