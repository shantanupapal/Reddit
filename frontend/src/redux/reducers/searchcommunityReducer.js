import { GET_ALL_COMMUNITIES } from "../actions/types";

const initialState = {
  searchCommunity: {},
};

export default function searchCommunityReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMMUNITIES:
      return {
        ...state,
        searchCommunity: action.payload,
      };

    default:
      return state;
  }
}
