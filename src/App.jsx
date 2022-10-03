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
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div className="container">
      <NavBarComponent />
      <Switch>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/register" component={RegisterPage}></Route>
        <Route path="/cardspage" component={BizCardPage}></Route>
        <Route path="/createcard" component={AddBizCard}></Route>
        <Route path="/MyCards" component={MyCards}></Route>
        <Route path="/moreinfo/:id" component={MoreInfoPage}></Route>
      </Switch>
      <ToastContainer />
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
