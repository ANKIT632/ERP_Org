import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

import { setUserDetails } from "../redux/UserSlice";

const CheckAuth = ({ children }) => {
  const [token, setToken] = useState();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const localStorageToken = await localStorage.getItem("erp_admin_token");
      setToken(localStorageToken);
      const decodedToken = jwtDecode(token);
      dispatch(setUserDetails(decodedToken.id));
      if (token === "undefined" || token === null) {
        navigate('/')
      }
    })();
  }, [token]);
  
  return children;
};


export default CheckAuth;



