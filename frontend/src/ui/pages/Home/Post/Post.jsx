import default_picture from '../../../../assets/profile.png'
import "./styles.css";

const Post = ({ image, caption, user, created_at,comments=0, likes=6 }) => {
    const formatDate = (created_at) => {
        const postDate = new Date(created_at);
        const today = new Date();
        const daysDifference = Math.floor((today - postDate) / (1000 * 3600 * 24));
    
        return (
            daysDifference === 0 ? 'Today' :
            daysDifference === 1 ? 'Yesterday' :
            `${daysDifference} days ago`
        );
    };
    console.log(image)
  return (
      <div className="post">
          <div className="post-header">
              <img src={default_picture} alt="User Profile" className="user-profile" />
              <span className="username">{user.username}</span>
              <span className="timestamp">{formatDate(created_at)}</span>
          </div>
          <img src={`http://127.0.0.1:8000/storage/${image}`} alt="Post Image" className="post-image" />
          <div className="post-buttons">
              <button className="like-button">{likes} Likes</button>
              <button className="comment-button">{comments} Comments</button>
          </div>
          <p className="caption">{caption}</p>
      </div>
  );
};

export default Post;