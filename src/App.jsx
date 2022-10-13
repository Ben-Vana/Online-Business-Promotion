import NavBarComponent from "./components/NavBar";
import RandomButton from "./components/RandomNumGen";
import AddBizCard from "./pages/AddNewBizCard";
import BizCardPage from "./pages/BizCardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RickNMortyCardPage from "./pages/RickNMorty";
import HomePage from "./pages/HomePage";
import MoreInfoPage from "./pages/MoreInfoPage";
import ShowNum from "./pages/ShowNum";
import MyCards from "./pages/MyCards";
import EditCard from "./pages/EditCard";
import QpFunction from "./pages/QparamsFunction";
import AuthTest from "./components/AuthTest";
import AuthGuard from "./components/AuthGuard";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div className="container">
      <NavBarComponent />
      <Switch>
        <Route path="/" exact component={HomePage}></Route>
        {/* <AuthTest path="/login" component={LoginPage}></AuthTest> */}
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/register" component={RegisterPage}></Route>
        <Route path="/cardspage" component={BizCardPage}></Route>
        <AuthGuard path="/createcard" component={AddBizCard}></AuthGuard>
        <AuthGuard path="/myCards" component={MyCards}></AuthGuard>
        <AuthGuard path="/moreinfo/:id" component={MoreInfoPage}></AuthGuard>
        <AuthGuard path="/editcard/:id" component={EditCard}></AuthGuard>
      </Switch>
      <ToastContainer />
      <QpFunction />
      {/* <BizCardPage /> */}
      {/* <LoginPage /> */}
      {/* <AddBizCard /> */}
      {/* <RegisterPage /> */}
      {/* <RickNMortyCardPage /> */}
      {/* <RandomButton /> */}
      {/* <ShowNum /> */}
    </div>
  );
};

export default App;
