import { useState, useEffect } from "react";
import MainInput from "../../../../components/MainInput/MainInput";
import MainButton from "../../../../components/MainButton/MainButton";
const Login = () => {
  return (
    <div className="login flex flex-center">
        <div className="form-box light-border margin-top">
          <MainInput placeholder="username or email"/>
          <MainInput type="password" placeholder="password"/>
        </div>
    </div>
  );
};
export default Login;
