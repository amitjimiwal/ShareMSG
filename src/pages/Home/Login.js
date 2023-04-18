import React from "react";
import { auth,provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import { LoginContext } from "../App";
// import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import {ReactComponent as Authsvg} from '../../assets/auth.svg'
const Login = () => {
  const [user]=useAuthState(auth);
    // const{isLogin,setisLogin}=useContext(LoginContext);
      const navigate=useNavigate();
 const signInandOut=async ()=>{
      if(!user){
        const result= await signInWithPopup(auth,provider);
        navigate("/");
      }
      else{
        await signOut(auth);
      }

 }
  return (
    <div className="sign-up-page">
     <div className="sign-up-main">
     <h1>{user ? "Logout from ShareMSG" :"Login to make your account in ShareMSG"}</h1>
      <p>{user? "Signout from below":"Sign In with your Google Account"} </p>
      <button onClick={signInandOut}>{user?"Signout":"SignIn"}</button>
     </div>
      <div className="login-auth">
        <div><Authsvg/></div>
      </div>
    </div>
  );
};

export default Login;
