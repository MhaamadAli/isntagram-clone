import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../assets/Instagram_logo.svg.png";
import HomeLogo from "../../../../assets/home.png";
import SearchLogo from "../../../../assets/search.png";
import ReelsLogo from "../../../../assets/reels.png";
import NotificationsLogo from "../../../../assets/notifications.png";
import MessagesLogo from "../../../../assets/messages.png";
import CreateLogo from "../../../../assets/create.png";
import ExploreLogo from "../../../../assets/explore.png";
import ProfileLogo from "../../../../assets/profile.png";
import NavCard from "../NavCard/NavCard";
import "./styles.css";

const SideBar = ({ openPopup }) => {
  const navigate = useNavigate();
  return (
    <div className="side-bar flex flex-column">
      <img src={Logo} alt="logo" className="main-logo2" />
      <div onClick={() => navigate("/home")}>
        <NavCard icon={HomeLogo} text={"Home"} />
      </div>

      <NavCard icon={SearchLogo} text={"Search"} />
      <NavCard icon={ExploreLogo} text={"Explore"} />
      <NavCard icon={ReelsLogo} text={"Reels"} />
      <NavCard icon={MessagesLogo} text={"Messages"} />
      <NavCard icon={NotificationsLogo} text={"Notifications"} />
      <NavCard icon={CreateLogo} text={"Create"} onClick={openPopup} />
      <div onClick={() => navigate("/profile")}>
        <NavCard icon={ProfileLogo} text={"Profile"} />
      </div>
    </div>
  );
};
export default SideBar;
