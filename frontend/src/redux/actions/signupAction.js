import { USER_SIGNUP } from "./types";
import { backendURI } from "../../utils/config";
import axios from "axios";

const userSignup = (signUpData) => (dispatch) => {
	console.log("-----------Inside SignupAction------------");
	console.log(signUpData);

	axios.defaults.withCredentials = true;
	axios
		.post(`${backendURI}/api/signup`, signUpData)
		.then((response) =>
			dispatch({
				type: USER_SIGNUP,
				payload: response.data,
			})
		)
		.catch((error) => {
			if (error.response && error.response.data) {
				return dispatch({
					type: USER_SIGNUP,
					payload: error.response.data,
				});
			}
		});
};

export default userSignup;
