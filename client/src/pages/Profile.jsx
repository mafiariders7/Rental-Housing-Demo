import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <img
          src={currUser?.avatar}
          alt="profile"
          className="rounded-full object-cover w-24 cursor-pointer h-24 self-center mt-2"
        />

        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
          value={currUser?.username}
        />

        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
          value={currUser?.email}
          
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />

        <button
          className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95
         disabled:opacity-80 "
        >
          Update
        </button>
      </form>


      <div className="text-red-600 flex justify-between mt-2 font-semibold cursor-pointer">
        <p>Delete account</p>
        <p>Sign Out</p>
      </div>

    </div>
  );
};

export default Profile;
