import React from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold my-7 text-center text-3xl">Sign Up</h1>

      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />

        <button
          className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95
         disabled:opacity-80"
        >
          Sign Up
        </button>
      </form>

      <div className="flex gap-1 mt-5">
        <p>Have an account? </p>
        <span className="text-blue-700">
          <Link to="/sign-in">Sign in</Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
