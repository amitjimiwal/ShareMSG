import { collection,getDocs,query, where } from "firebase/firestore";
import { database ,auth} from "../config/firebase";
import { addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

const Post = ({title,description,id,username}) => {

  const [likes,setlikes]=useState(0);   
  const likesref=collection(database,"likes");

  const [user]=useAuthState(auth);

  const likesDoc=query(likesref,where("postid","==",id));
  const getlikes=async()=>{
    const data=await getDocs(likesDoc);
    setlikes(data.docs.length);
  }
  const addLike=async()=>{
    try{
      await addDoc(likesref,{
        postid:id,
        userid:user?.uid
      })
    }catch(error){
     alert(error);
    }
  }
  useEffect(()=>{
    getlikes();
  },[addLike]);
  return (
    <div className="post-body">
    <div className="postbody-top">
      <h4>{title}</h4>
      <p>~ {username}</p>
    </div>
    <div className="postbody-middle">
      <p>{description}</p>
    </div>
    {/* <div className="postbody-bottom">
      <button onClick={addLike}>Like</button>
    </div> */}

      
    </div>
  )
}

export default Post