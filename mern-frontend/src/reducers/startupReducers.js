import { GET_STARTUPS } from "../actions/types";

const initState = { loading: false, startup_list: [] };

export default function (state = initState, action) {
  switch (action.type) {
    case GET_STARTUPS:
      return {
        ...state,
        startup_list: action.payload,
      };
    default:
      return state;
  }
}
