import React, { useState, useEffect } from "react";
import Post from "./Post/Post";
import SideBar from "./SideBar/SideBar";
import PopUp from "../../components/Popup/Popup";
import { sendRequest } from "../../../core/tools/remote/request";
import { requestMethods } from "../../../core/enums/requestMethods";
import "./styles.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [postCredentials, setPostCredentials] = useState({
    caption: "",
    post_image: null,
  });

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

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setPostCredentials({
      ...postCredentials,
      post_image: base64,
    });
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const createPostAction = async (e) => {
    e.preventDefault();

    if (!postCredentials.post_image) {
      console.error('Please select an image');
      return;
    }

    const postData = {
      caption: postCredentials.caption,
      post_image: postCredentials.post_image, 
    };

    try {
      const response = sendRequest(requestMethods.POST, '/create', postData)
      console.log('Post created successfully:', response.data);
      setPostCredentials({ caption: '', post_image: '' });
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="flex flex-row">
      <SideBar openPopup={openPopup} />
      <div className="main">
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            image={post.image}
            caption={post.caption}
            user={post.user}
            created_at={post.created_at}
          />
        ))}
      </div>
      {showPopup && (
        <PopUp
          formTitle={"Create Post"}
          buttonText={"Create"}
          isOpen={showPopup}
          closePopUp={closePopup}
          handleSubmit={createPostAction}
        >
          <div>
            <label htmlFor="caption">Caption</label>
            <input
              type="text"
              id="caption"
              name="caption"
              value={postCredentials.caption}
              onChange={(e)=> {setPostCredentials({
                ...postCredentials,
                caption: e.target.value

              })}}
            />
          </div>
          <div>
            <label htmlFor="postImage">Image</label>
            <input type="file" name="postImage" id="postImage" onChange={(e)=> uploadImage(e)} multiple />
          </div>
        </PopUp>
      )}
    </div>
  );
};
export default Home;
