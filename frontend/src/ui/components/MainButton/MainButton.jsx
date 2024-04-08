import './mainbutton.css'

const MainButton = ({text="click", width="w-large"}) => {
  return (
    <button className={`main-btn ${width}`}>
      {text}
    </button>
  )
}
export default MainButton