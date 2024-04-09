import './styles.css'
const NavCard = ({ icon, text }) => {
  return (
    <div className="nav-card flex flex-row align-center">
      <div className="nav-card-icon">
        <img src={icon} alt="icon" />
      </div>
      {text}
    </div>
  );
};
export default NavCard;
