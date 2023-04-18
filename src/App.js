import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Home/Login";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import { createContext } from "react";
import CreatePost from "./pages/create-post/CreatePost";
export const LoginContext = createContext();
function App() {
  const [isLogin, setisLogin] = useState(false);
  return (
    <div className="App">
      <LoginContext.Provider value={{ isLogin, setisLogin }}>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createpost" element={<CreatePost />} />
          </Routes>
        </Router>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
