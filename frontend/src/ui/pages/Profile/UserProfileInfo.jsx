import React from 'react';
import './styles.css'
import DefaultImage from '../../../assets/post1.jpg'

const UserProfileInfo = ({ profileData,nbofFollwers ,nbofFollowing}) => {

  return (
    <div className="user-profile-info">
      <img src={DefaultImage} alt="Profile" />
      <div className="user-info">
        <h3>{profileData?.username}</h3>
        <p>
          <strong>{nbofFollwers}</strong> Followers
        </p>
        <p>{profileData?.bio ?? "I won't die before my heart stops beating"}</p>
      </div>
    </div>
  );
};

export default UserProfileInfo;