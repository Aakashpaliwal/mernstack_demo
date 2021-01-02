import { GET_TODOS } from "../actions/types";

const initState = { loading: false, todo_list: [] };

export default function (state = initState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todo_list: action.payload,
      };
    default:
      return state;
  }
}
