import jwt_Decode from "jwt-decode";
import { useDispatch } from "react-redux";
import autoLogin from "services/autoLogin";
import { authActions } from "store/auth";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  const autoLoginFunc = async (token) => {
    try {
      let { data } = await autoLogin();
      let tokenData = jwt_Decode(token);
      if (data) {
        dispatch(authActions.login(tokenData));
        return true;
      }
    } catch {
      return false;
    }
  };
  return autoLoginFunc;
};

export default useAutoLogin;
