import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md sticky">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/'>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Soham</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>

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
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currUser ? (
              <img
                src={currUser?.avatar}
                alt="profile"
                className="rounded-full w-7 h-7 object-cover"
              />
            ) : (
              <li className="hidden sm:inline text-slate-700 hover:underline">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
