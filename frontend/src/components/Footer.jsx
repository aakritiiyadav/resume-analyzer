import { Link } from "react-router-dom";
import { Brain, Send } from "lucide-react";
import { useState } from "react";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative mt-32 bg-[#0D051A] overflow-hidden">
      {/* Wave Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 120" className="relative block w-full h-[60px]" preserveAspectRatio="none">
          <path
            fill="#1B0F33"
            d="M320,80L360,74.7C400,69,480,59,560,64C640,69,720,91,800,90.7C880,91,960,69,1040,64C1120,59,1200,69,1280,74.7L1320,80L1440,80L1440,120L1320,120C1200,120,1120,120,1040,120C960,120,880,120,800,120C720,120,640,120,560,120C480,120,400,120,320,120L280,120C200,120,120,120,40,120L0,120L0,80Z"
          />
        </svg>
      </div>

      {/* Main Footer Container */}
      <div className="bg-gradient-to-b from-[#1B0F33] to-[#0D051F] pt-24 pb-12 px-6 md:px-12 text-gray-300 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 bg-purple-500/10 border border-purple-500/20 text-[#A78BFA] flex items-center justify-center rounded-xl shadow-lg shadow-purple-500/5">
                <Brain className="h-5.5 w-5.5 animate-pulse" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight font-heading">
                Resume<span className="text-[#A78BFA]">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Empowering job seekers with AI-driven resume matching, ATS optimization, and deep skill gap analytics to land their dream roles.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3.5 mt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 bg-white/5 border border-white/10 hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-white flex items-center justify-center rounded-lg transition duration-300"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 bg-white/5 border border-white/10 hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-white flex items-center justify-center rounded-lg transition duration-300"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 bg-white/5 border border-white/10 hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-white flex items-center justify-center rounded-lg transition duration-300"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-white text-lg font-bold font-heading mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#7C3AED]">
              Quick Links
            </h3>
            <ul className="space-y-3.5 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white hover:pl-1 transition-all duration-300 flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/upload" className="hover:text-white hover:pl-1 transition-all duration-300 flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Upload Resume
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white hover:pl-1 transition-all duration-300 flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-white hover:pl-1 transition-all duration-300 flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Scan History
                </Link>
              </li>
            </ul>
          </div>

          {/* Features Column */}
          <div>
            <h3 className="text-white text-lg font-bold font-heading mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#7C3AED]">
              Key Features
            </h3>
            <ul className="space-y-3.5 text-sm text-gray-400">
              <li>
                <Link to="/upload" className="hover:text-white hover:pl-1 transition-all duration-300 flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  ATS Scoring Engine
                </Link>
              </li>
              <li>
                <Link to="/upload" className="hover:text-white hover:pl-1 transition-all duration-300 flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Skill Analysis
                </Link>
              </li>
              <li>
                <Link to="/upload" className="hover:text-white hover:pl-1 transition-all duration-300 flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Job Matching Analysis
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white hover:pl-1 transition-all duration-300 flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Interactive Improvements
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-white text-lg font-bold font-heading mb-5 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-[#7C3AED]">
              Stay Tuned
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Get notified of new optimization rules and platform updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition duration-300"
              />
              <button
                type="submit"
                className="px-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center justify-center transition duration-300"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-400 mt-2 font-semibold animate-pulse">
                Subscribed successfully!
              </p>
            )}
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition duration-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition duration-300">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;