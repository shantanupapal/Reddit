import { GET_USER, UPDATE_USER } from "./types";
import { backendURI } from "../../utils/config";
import axios from "axios";

export const getUser = (user) => (dispatch) => {
	axios.defaults.withCredentials = true;
	axios.defaults.headers.common["authorization"] = localStorage.getItem(
		"token"
	);
	axios
		.get(`${backendURI}/api/profile/getuserprofile/${user.userid}`)
		.then((response) => {
			console.log("Received response from server:", response);
			return dispatch({
				type: GET_USER,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

export const updateUser = (userProfileData) => (dispatch) => {
	axios.defaults.withCredentials = true;
	axios.defaults.headers.common["authorization"] = localStorage.getItem(
		"token"
	);
	axios
		.post(`${backendURI}/api/profile/updateuser`, userProfileData)
		.then((response) => {
			console.log("response for update profile is", response);
			if (response.status === 200) {
				console.log("updated username is : ", userProfileData.username);
				localStorage.setItem("username", userProfileData.username);
				alert("User Profile updated successfully!");
			} else if (response.status === 209) {
				alert("Update Failed! Please Try Again");
			} else if (response.status === 207) {
				alert("No User Found");
			} else if (response.status === 299) {
				alert("EmailId already exists, use another emailId");
			} else {
				alert("Server Error!");
			}
			return dispatch({
				type: UPDATE_USER,
				payload: response.data,
			});
		})
		.catch((error) => {
			console.log(error);
		});
};
