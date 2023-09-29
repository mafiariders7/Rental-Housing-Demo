import React from "react";
import { Routes ,Route } from "react-router-dom";
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Singnin from "./pages/Singnin"
import SingnOut from "./pages/SingnOut"
import About from "./pages/About"
import Header from "./Components/Header";
const App = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign-in" element={<Singnin/>} />
        <Route path="/sing-up" element={<SingnOut/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/profile" element={<Profile/>} />

      </Routes>
      {/* <h1 className="text-red-500">App</h1> */}
    </>
  );
};

export default App;
