import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userProfileReducer from "./userProfileReducer";
import moderationReducer from "./moderationReducer";
import myCommunityReducer from "./myCommunityReducer";
import searchCommunityReducer from "./searchcommunityReducer";

const appReducer = combineReducers({
  authuser: authReducer,
  userProfile: userProfileReducer,
  moderation: moderationReducer,
  myCommunity: myCommunityReducer,
  searchCommunity: searchCommunityReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
