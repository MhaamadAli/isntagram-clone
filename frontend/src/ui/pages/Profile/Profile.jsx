import { useState,useEffect } from "react"
import { sendRequest } from "../../../core/tools/remote/request";
import { requestMethods } from "../../../core/enums/requestMethods";
import SideBar from "../Home/SideBar/SideBar"
import UserProfileInfo from './UserProfileInfo'

const Profile = () => {
  const [profileData, setProfileData] = useState();
  const [nbOffollower, setNbOffollower] = useState();
  const [nbOffollowing, setNbOffollowing] = useState();
  const fetchProfile = async () => {
    try {
      const res = await sendRequest(requestMethods.GET, "profile");
      console.log(res.data)
      setProfileData(res.data);
      setNbOffollower(res.data.nbOfFollower)
      setNbOffollowing(res.data.nbOffollowing)
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="profile-page">
      <SideBar />
      <UserProfileInfo profileData={profileData} nbofFollwers={nbOffollower} nbofFollowing={nbOffollowing}/>
    </div>
  )
}
export default Profile