import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { useAuthenticationLogic } from "./logic";
import "./authentication.css";

const Authentication = () => {
  const { credentials, isLogin, setCredentials, switcher } =
    useAuthenticationLogic();
  return (
    <div>
      <div className="flex flex-center margin-top-100">
        {isLogin ? (
          <Login
            switchHandler={switcher}
            credentials={credentials}
            setCredentials={setCredentials}
          />
        ) : (
          <Signup switchHandler={switcher} />
        )}
      </div>
    </div>
  );
};
export default Authentication;
