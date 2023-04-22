import React, { useEffect, useState } from "react";
import { getDocs, collection, doc } from "firebase/firestore";
import { database } from "../../config/firebase";
import Post from "../../components/Post";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { ReactComponent as Svg} from "../../assets/dancing.svg";
import {ReactComponent as ReadpostSvg} from '../../assets/readpost.svg'
const Home = () => {
  const [user] = useAuthState(auth);
  const [postList, setpostList] = useState([]);
  const postref = collection(database, "posts"); //reference to the collection

  const getPosts = async () => {
    try {
      const data = await getDocs(postref);
      setpostList(
        data.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }))
      );
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="home-container">
      {user ? (
        <>
          <h1 className="post-headings">Recent Posts</h1>
          <div className="posts-container">
            {postList.map((post, index) => (
              <Post
                key={index}
                title={post.title}
                description={post.description}
                username={post.username}
                id={post.id}
              />
            ))}
          </div>
          <div className="post-svg">
             <ReadpostSvg/>
          </div>
        </>
      ) : (
        <div className="home-before-login">
          <div className="home-heading">
            <h1>ShareMSG</h1>
            <h4>Where chads Share their thoughts...</h4>
          </div>
          <div className="home-svg">
             <Svg/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
