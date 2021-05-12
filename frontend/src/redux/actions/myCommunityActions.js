import {
  GET_COMMUNITY,
  ADD_RULE,
  UPDATE_DESC,
  DELETE_COMMUNITY,
} from "./types";
import { backendURI } from "../../utils/config";
import axios from "axios";

export const getCommunity = (user) => (dispatch) => {
  console.log("values", user);
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["authorization"] = localStorage.getItem(
    "token"
  );
  axios
    .get(`${backendURI}/api/mycommunity/getCommunityDetails`, {
      params: {
        userid: user.user,
      },
    })
    .then((response) => {
      console.log("Received response from server:", response);
      return dispatch({
        type: GET_COMMUNITY,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addRule = (rule) => (dispatch) => {
  console.log("rule is: ", rule);
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["authorization"] = localStorage.getItem(
    "token"
  );
  axios
    .post(`${backendURI}/api/mycommunity/addRule`, rule)
    .then((response) => {
      console.log("response for rule add is", response);
      if (response.status === 200) {
        console.log("added rule title is : ", rule.title);
        //alert("User Profile updated successfully!");
        // swal("Success", "Rule added successfully!", "success");
      } else {
        //alert("User Profile update failed!!");
        // swal("Oops!", "Rule failed to add!", "error");
      }
      return dispatch({
        type: ADD_RULE,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateDesc = (desc) => (dispatch) => {
  console.log("desc is: ", desc);
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["authorization"] = localStorage.getItem(
    "token"
  );
  axios
    .post(`${backendURI}/api/mycommunity/updateDesc`, desc)
    .then((response) => {
      console.log("response for desc add is", response);
      if (response.status === 200) {
        console.log("added desc is : ", desc.desc);
        //alert("User Profile updated successfully!");
        // swal("Success", "Rule added successfully!", "success");
      } else {
        //alert("User Profile update failed!!");
        // swal("Oops!", "Rule failed to add!", "error");
      }
      return dispatch({
        type: UPDATE_DESC,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteCommunity = (leave) => (dispatch) => {
  console.log("community is: ", leave);
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["authorization"] = localStorage.getItem(
    "token"
  );
  axios
    .post(`${backendURI}/api/mycommunity/deleteCommunity`, leave)
    .then((response) => {
      console.log("response for deleting community is", response);
      if (response.status === 200) {
        console.log("left community is : ", leave.community_id);
        //alert("User Profile updated successfully!");
        // swal("Success", "Rule added successfully!", "success");
      } else {
        //alert("User Profile update failed!!");
        // swal("Oops!", "Rule failed to add!", "error");
      }
      return dispatch({
        type: DELETE_COMMUNITY,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
