import './maininput.css'
const MainInput = ({ placeholder = "input", type = "text", }) => {
  return (
    <input
      className={`main-input`}
      placeholder={`${placeholder}`}
      type={`${type}`}
    />
  );
};
export default MainInput;
