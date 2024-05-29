import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import AllProducts from "./components/AllProducts";
import VenueSpaces from "./components/VenueSpaces";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Error from "./components/move";
import Guides from "./components/guides";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/venue-spaces" element={<VenueSpaces/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/move" element={<Error/>}/>
        <Route path="/guides" element={<Guides/>}/>
      </Routes>
    </Router>
  );
};

export default App;
