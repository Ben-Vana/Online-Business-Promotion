import AddBizCard from "./pages/AddNewBizCard";
import BizCardPage from "./pages/BizCardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RickNMortyCardPage from "./pages/RickNMorty";

const App = () => {
  return (
    <div className="container">
      <AddBizCard />
      <BizCardPage />
      {/* <RegisterPage /> */}
      {/* <LoginPage /> */}
      {/* <RickNMortyCardPage /> */}
    </div>
  );
};

export default App;
