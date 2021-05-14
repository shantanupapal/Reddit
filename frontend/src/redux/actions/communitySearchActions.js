import { GET_ALL_COMMUNITIES } from "./types";
import { backendURI } from "../../utils/config";
import axios from "axios";

export const getAllCommunities = () => (dispatch) => {
  console.log("Inside getAllCommunities actions");
  axios.defaults.withCredentials = true;
  // axios.defaults.headers.common["authorization"] = localStorage.getItem(
  // 	"token"
  // );
  axios
    .get(`${backendURI}/api/search/getAllCommunities`)
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
