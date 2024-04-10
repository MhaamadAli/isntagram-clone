import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainInput from "../../../../components/MainInput/MainInput";
import MainButton from "../../../../components/MainButton/MainButton";
import Logo from "../../../../../assets/Instagram_logo.svg.png";

import { sendRequest } from "../../../../../core/tools/remote/request";
import { requestMethods } from "../../../../../core/enums/requestMethods";

const Login = ({ switchHandler, credentials, setCredentials }) => {
  const handleclick = async () => {
    console.log(credentials);
    const res = await sendRequest(requestMethods.POST, "/login", {
      ...credentials,
    });

    if (res.data.status === "success") {
      localStorage.setItem("token", res.data.authorization.token);
      navigate("/home");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="login flex flex-column flex-center align-center">
      <div className="form-box light-border flex flex-column margin-top align-center ">
        <img src={Logo} alt="logo" className="main-logo" />
        <input
          className="main-input"
          placeholder="username or email"
          onChange={(e) => {
            setCredentials({ ...credentials, email: e.target.value });
          }}
        />
        <input
          className="main-input"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setCredentials({ ...credentials, password: e.target.value });
          }}
        />
        <MainButton text="Login" clickhandler={handleclick} />
      </div>
      <div className="small-box light-border flex flex-center text-center flex-column margin-top align-center">
        <p className="">
          Don't have an account?{" "}
          <span
            onClick={() => {
              switchHandler(false);
            }}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};
export default Login;
