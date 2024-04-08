import './mainbutton.css'

const MainButton = ({text="click"}) => {
  return (
    <button className={`main-btn`}>
      {text}
    </button>
  )
}
export default MainButton