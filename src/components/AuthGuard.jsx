import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const AuthGuard = ({ component: Page, ...rest }) => {
  const login = useSelector((state) => state.auth.logIn);

  return (
    <Route
      {...rest}
      render={(props) =>
        login ? <Page {...props}></Page> : <Redirect to="/login"></Redirect>
      }
    ></Route>
  );
};

export default AuthGuard;
