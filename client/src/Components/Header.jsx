import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md sticky">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Soham</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        <form
          action=""
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="search"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />

          <FaSearch className="text-slate-600" />
        </form>

        <ul className="flex items-center gap-4">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to="/">Home</Link>{" "}
          </li>
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to="/about">About</Link>
          </li>
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to="sign-in">Sign In</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
