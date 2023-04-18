import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import { LoginContext } from "../App";
// import { useContext } from "react";
const Navbar = () => {
  // const { isLogin, setisLogin } = useContext(LoginContext);
  const [user] = useAuthState(auth);
  return (
    <div className="navbar">
      <ul className="navlist">
        <li>
          <Link to="/" className="router-links">
            Home
          </Link>
        </li>
      </ul>

      <div className="userinfo">
        {user && (
          <li>
            <Link to="/createpost" className="router-links">
              Create Post
            </Link>
          </li>
        )}
        <li className="logbutton">
          <Link to="/login" className="router-links">
            {user ? "LogOut" : "Login"}
          </Link>
        </li>
        <li className="user-information">
        {user && (
          <>
            <p className="username">{user?.displayName}</p>
            <img src={user?.photoURL} className="pfp"/>
          </>
        )}
        </li>
      </div>
    </div>
  );
};

export default Navbar;
