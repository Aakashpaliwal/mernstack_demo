import axios from "axios";
import { GET_TODOS } from "./types";

export const getTodoList = (propsData) => (dispatch) => {
  axios
    .get("/api/todos/gettodos")
    .then((res) => {
      console.log("res", res);
      dispatch({
        type: GET_TODOS,
        payload: res,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
