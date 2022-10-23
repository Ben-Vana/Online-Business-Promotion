import NavBarComponent from "components/NavBar";
import AddBizCard from "pages/AddNewBizCard";
import BizCardPage from "pages/BizCardPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import HomePage from "pages/HomePage";
import MoreInfoPage from "pages/MoreInfoPage";
import MyCards from "pages/MyCards";
import EditCard from "pages/EditCard";
import AuthGuard from "components/AuthGuard";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import useAutoLogin from "hooks/useAutoLogin";
import { useSelector } from "react-redux";

const App = () => {
  const [tryLogin, setTryLogin] = useState(true);
  const autoLoginFunc = useAutoLogin();
  const loggedIn = useSelector((state) => state.auth.logIn);

  useEffect(() => {
    (async () => {
      let status = await autoLoginFunc(localStorage.getItem("token"));
      if (status === false) {
        setTryLogin(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (loggedIn === true && tryLogin === true) {
      setTryLogin(false);
    }
  }, [loggedIn]);

  return (
    <div className="container">
      <NavBarComponent />
      {!tryLogin && (
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/cardspage" component={BizCardPage}></Route>
          <AuthGuard path="/createcard" component={AddBizCard}></AuthGuard>
          <AuthGuard path="/myCards" component={MyCards}></AuthGuard>
          <AuthGuard path="/moreinfo/:id" component={MoreInfoPage}></AuthGuard>
          <AuthGuard path="/editcard/:id" component={EditCard}></AuthGuard>
        </Switch>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
