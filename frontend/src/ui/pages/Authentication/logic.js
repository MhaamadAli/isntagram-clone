import { useEffect, useState } from "react";

export const useAuthenticationLogic = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!credentials.email.includes("@")) {
      setError("Invalid email");
    } else if (credentials.password.length < 6) {
      setError("Short password");
    } else {
      setError("");
    }
  }, [credentials]);

  const switcher = (value) => {
    setIsLogin(value);
  };

  return {
    isLogin,
    credentials,
    setCredentials,
    switcher,
    setIsLogin,
    setError,
  };
};
