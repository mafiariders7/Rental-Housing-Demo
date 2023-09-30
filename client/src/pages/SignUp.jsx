import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setError(data.message);
      setLoading(false);
    }
  };

  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold my-7 text-center text-3xl">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95
         disabled:opacity-80 "
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      <OAuth />

      <div className="flex gap-1 mt-5">
        <p>Have an account? </p>
        <span className="text-blue-700">
          <Link to="/sign-in">Sign in</Link>
        </span>
      </div>

      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
