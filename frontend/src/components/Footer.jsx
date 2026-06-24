import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative mt-24">

      {/* Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-28"
        >
          <path
            fill="#CDB4DB"
            d="M0,128L60,117.3C120,107,240,85,360,101.3C480,117,600,171,720,176C840,181,960,139,1080,122.7C1200,107,1320,117,1380,122.7L1440,128V320H0Z"
          />
        </svg>
      </div>

      {/* Footer Body */}
      <div className="bg-[#CDB4DB] pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          <div>
            <h2 className="text-3xl font-bold text-white">
              Resume Analyzer
            </h2>
            <p className="mt-4 text-white/80 leading-relaxed">
              AI-powered resume optimization for ATS, job matching,
              and skill-gap detection.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Quick Links
            </h3>
            <div className="space-y-2 text-white/80">
              <Link to="/" className="block hover:underline hover:text-white transition duration-300">
                Home
              </Link>
              <Link to="/upload" className="block hover:underline hover:text-white transition duration-300">
                Upload
              </Link>
              <Link to="/dashboard" className="block hover:underline hover:text-white transition duration-300">
                Dashboard
              </Link>
              <Link to="/history" className="block hover:underline hover:text-white transition duration-300">
                History
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Features
            </h3>
            <div className="space-y-2 text-white/80">
              <Link to="/upload" className="block hover:underline hover:text-white transition duration-300">
                ATS Scoring
              </Link>
              <Link to="/upload" className="block hover:underline hover:text-white transition duration-300">
                Skill Analysis
              </Link>
              <Link to="/upload" className="block hover:underline hover:text-white transition duration-300">
                Job Matching
              </Link>
              <Link to="/history" className="block hover:underline hover:text-white transition duration-300">
                Resume History
              </Link>
            </div>
          </div>

        </div>

        <div className="border-t border-white/30 mt-10 pt-6 text-center text-white/70 text-sm">
          © 2026 Resume Analyzer. Crafted with AI.
        </div>
      </div>
    </footer>
  );
};

export default Footer;