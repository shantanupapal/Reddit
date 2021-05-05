import { USER_LOGIN, USER_LOGOUT } from "./types";
import { backendURI } from "../../utils/config";
import axios from "axios";

export const userLogin = (loginData) => (dispatch) => {
	axios.defaults.withCredentials = true;
	axios
		.post(`${backendURI}/api/login`, loginData)
		.then((response) => {
			console.log("Received response from server:", response);
			return dispatch({
				type: USER_LOGIN,
				payload: response.data,
			});
		})

		.catch((error) => {
			if (error.response && error.response.data) {
				console.log("Received error from server:", error.response);
				return dispatch({
					type: USER_LOGIN,
					payload: error.response.data,
				});
			}
		});
};

export const userLogout = () => (dispatch) => {
	return dispatch({ type: USER_LOGOUT });
};
