import './mainbutton.css'

const MainButton = ({text="click", clickhandler}) => {
  return (
    <button className={`main-btn`} onClick={() => {
      clickhandler()
    }}>
      {text}
    </button>
  )
}
export default MainButton