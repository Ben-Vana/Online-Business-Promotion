import { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

const AuthTest = ({ component: Page, ...rest }) => {
  const [sec, setSec] = useState();

  useEffect(() => {
    setInterval(() => setSec(new Date().getSeconds()), 1000);
    return () => clearInterval();
  }, [sec]);

  return (
    <Route
      {...rest}
      render={(props) =>
        sec % 2 !== 0 ? <Page {...props}></Page> : <Redirect to="/"></Redirect>
      }
    ></Route>
  );
};

export default AuthTest;
