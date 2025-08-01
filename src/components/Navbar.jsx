import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between bg-gray-900 text-white px-6 py-3 shadow-md min-h-[10vh]">
      
      <div className="flex items-center space-x-3">
        <img
          src="/logo.png"
          alt="Logo"
          className=" w-16 h-16 sm:w-13 sm:h-13 rounded-full"
        />
        <span className="text-xl font-bold mx-0 px-0 ">&lt;Passco</span>
          <span className="mx-0 px-0 text-xl font-bold text-amber-300">DaGama/&gt;</span>
      </div>

      <div>
        <a
          href="https://github.com/your-repo-link"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-400 transition text-xs sm:text-sm"
        >
          View on GitHub →
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
