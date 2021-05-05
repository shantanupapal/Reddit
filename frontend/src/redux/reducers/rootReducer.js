import { combineReducers } from "redux";
import authReducer from "./authReducer";

const appReducer = combineReducers({
	authuser: authReducer,
});

const rootReducer = (state, action) => {
	// when a logout action is dispatched it will reset redux state
	if (action.type === "USER_LOGOUT") {
		state = undefined;
	}

	return appReducer(state, action);
};
export default rootReducer;
