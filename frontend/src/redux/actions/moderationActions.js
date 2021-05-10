import { GET_ALL_COMMUNITIES } from "./types";
import { backendURI } from "../../utils/config";
import axios from "axios";

export const getAllCommunities = (user) => (dispatch) => {
	console.log("Inside getAllCommunities actions", user);
	axios.defaults.withCredentials = true;
	// axios.defaults.headers.common["authorization"] = localStorage.getItem(
	// 	"token"
	// );
	axios
		.get(`${backendURI}/api/moderation/getAllCommunities/${user.userid}`)
		.then((response) => {
			console.log("Actions::response from getAllCommunities", response.data);
			dispatch({
				type: GET_ALL_COMMUNITIES,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};
