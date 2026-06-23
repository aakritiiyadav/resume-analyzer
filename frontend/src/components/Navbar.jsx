import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full px-4 md:px-8 py-5 bg-[#FCFAFF] shadow-md border-b border-[#E6DDF0]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#8E6CB3] tracking-wide">
          Resume Analyzer
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[#4B3B5C] font-medium">
          <Link
            to="/"
            className="hover:text-[#8E6CB3] transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/upload"
            className="hover:text-[#8E6CB3] transition duration-300"
          >
            Upload
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-[#8E6CB3] transition duration-300"
          >
            Dashboard
          </Link>

          <Link
            to="/history"
            className="hover:text-[#8E6CB3] transition duration-300"
          >
            History
          </Link>

          <Link
            to="/login"
            className="px-5 py-2 bg-[#B497D6] text-white rounded-none hover:bg-[#9D7BC4] transition duration-300"
          >
            Login / Signup
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden px-4 py-2 bg-[#B497D6] text-white rounded-none">
          Menu
        </button>

      </div>
    </nav>
  );
};

export default Navbar;