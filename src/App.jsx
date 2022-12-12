import NavBarComponent from "components/NavBar";
import AddBizCard from "pages/AddNewBizCard";
import BizCardPage from "pages/BizCardPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import HomePage from "pages/HomePage";
import MoreInfoPage from "pages/MoreInfoPage";
import MyCards from "pages/MyCards";
import EditCard from "pages/EditCard";
import LoginGuard from "components/LoginAuthGuard";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import useAutoLogin from "hooks/useAutoLogin";
import { useSelector } from "react-redux";
import Footer from "components/Footer";
import AboutUs from "pages/AboutUs";
import "./App.css";
import NotFound from "pages/NotFound";

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
    <div className="main-theme">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="container"
      >
        <NavBarComponent />
        {!tryLogin && (
          <Switch>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/aboutus" exact component={AboutUs}></Route>
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/register" component={RegisterPage}></Route>
            <Route path="/cardspage" component={BizCardPage}></Route>
            <LoginGuard path="/createcard" component={AddBizCard}></LoginGuard>
            <LoginGuard path="/myCards" component={MyCards}></LoginGuard>
            <LoginGuard
              path="/moreinfo/:id"
              component={MoreInfoPage}
            ></LoginGuard>
            <LoginGuard path="/editcard/:id" component={EditCard}></LoginGuard>
            <Route path="*" component={NotFound} />
          </Switch>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
