import axios from "axios";
import { GET_STARTUPS } from "./types";

export const getStartupList = (propsData) => (dispatch) => {
  axios
    .get("/api/startups/getstartups")
    .then((res) => {
      dispatch({
        type: GET_STARTUPS,
        payload: res.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};
