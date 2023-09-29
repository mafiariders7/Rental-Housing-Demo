import React from "react";
import { Routes ,Route } from "react-router-dom";
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Signin from "./pages/Signin"
import SignUp from "./pages/SignUp";
import About from "./pages/About"
import Header from "./Components/Header";
const App = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign-in" element={<Signin/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/profile" element={<Profile/>} />

      </Routes>
      {/* <h1 className="text-red-500">App</h1> */}
    </>
  );
};

export default App;
