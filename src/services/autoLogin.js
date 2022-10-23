import axios from "axios";

const autoLogin = () => {
  let token = localStorage.getItem("token");
  if (token) {
    return axios.get("/users/userInfo");
  }
};

export default autoLogin;
