import React, { useState, useEffect } from "react";
import Post from "./Post/Post";
import SideBar from "./SideBar/SideBar";
import userprofile from "../../../assets/post1.jpg";
import { sendRequest } from "../../../core/tools/remote/request";
import { requestMethods } from "../../../core/enums/requestMethods";
import "./styles.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await sendRequest(requestMethods.GET, "/getAll");

      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="main">
      {
        posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            image_url={post.image_url}
            caption={post.caption}
            user={post.user}
            created_at={post.created_at}
          />
        ))
      }
      </div>
    </div>
  );
};
export default Home;
