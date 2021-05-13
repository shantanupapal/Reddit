import {
  GET_COMMUNITY,
  ADD_RULE,
  UPDATE_DESC,
  DELETE_COMMUNITY,
} from "../actions/types";

const initialState = {
  myCommunity: {},
};

export default function myCommunityReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMUNITY:
      return {
        ...state,
        myCommunity: action.payload,
      };

    case ADD_RULE:
      return {
        ...state,
        data: action.payload,
      };

    case UPDATE_DESC:
      return {
        ...state,
        data: action.payload,
      };

    case DELETE_COMMUNITY:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
}
