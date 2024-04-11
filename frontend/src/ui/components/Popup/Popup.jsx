import React, { useState } from "react";
import "./popup.css";
const PopUp = ({
  children,
  handleSubmit,
  buttonText,
  formTitle,
  isOpen,
  closePopUp,
}) => {
  return (
    <div>
      {isOpen && (
        <div className="popup">
          <div className="popup-inner">
            <div>
              <h2>{formTitle}</h2>
              <span onClick={closePopUp}>&times;</span>
            </div>
            <form onSubmit={handleSubmit}>
              {children}
              <div className="sub-btn">
                <button type="submit">{buttonText}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUp;
