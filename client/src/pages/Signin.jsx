import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userslice";
import OAuth from "../Components/OAuth";

const Signin = () => {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const {error , loading} = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // setLoading(true);
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data.message);

      if (data.success === false) {
        // setError(data.message);
        // setLoading(false);
        dispatch(signInFailure(data.message));
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data.user));
      navigate("/");
    } catch (error) {
      // setError(data.message);
      // setLoading(false);
      dispatch(signInFailure(data.message))
    }
  };

  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="font-semibold my-7 text-center text-3xl">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       
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
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>

      <OAuth/>
       
      <div className="flex gap-1 mt-5">
        <p>Doesn't have an account? </p>
        <span className="text-blue-700">
          <Link to="/sign-up">Sign Up</Link>
        </span>
      </div>
      {
        error&& <p className="text-red-500 mt-5">{error}</p>
      }
    </div>
  );
};

export default Signin;
