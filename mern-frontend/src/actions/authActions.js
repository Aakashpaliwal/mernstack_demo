import axios from "axios";
import authToken from "../utils/authToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

//register
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

//login
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      console.log("loginres", res);
      const { token } = res.data;
      sessionStorage.setItem("jwtToken", token);
      authToken(token);
      const decode = jwt_decode(token);
      console.log("decode", decode);
      dispatch(setCurrentUser(decode));
    })
    .catch((error) => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    });
};

//currentUser
export const setCurrentUser = (decode) => {
  return {
    type: SET_CURRENT_USER,
    payload: decode,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
