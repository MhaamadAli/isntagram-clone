import "./styles.css";
import likeLogo from '../../../../assets/like.png'
import likeLogo from '../../../../assets/like.png'

const Post = ({username,timestamp,postImage,likes,caption,comments}) => {
  return (
    <div className="post">
      <div className="post-header">
        <img alt="userprofilImage" />
        {username} • <span>{timestamp}</span>
      </div>
      <div className="post-image">
        <img src={postImage} alt="Post Image" />
      </div>
      <div className="post-footer">
      <div className="post-footer-icons">

      </div>
      </div>
    </div>
  );
};
export default Post;
