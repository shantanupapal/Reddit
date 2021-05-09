import React from "react";
import { Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Profile from "./Profile/Profile";
import CreateCommunity from "./Communities/CreateCommunity/CreateCommunity";
import MyCommunities from "./MyCommunities/MyCommunities";
import MyCommunityProfile from "./MyCommunities/MyCommunityProfile";

const Main = () => {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Signup" component={Signup} />
      <Route exact path="/Profile" component={Profile} />
      <Route exact path="/CreateCommunity" component={CreateCommunity} />
      <Route exact path="/MyCommunities" component={MyCommunities} />
      <Route
        exact
        path="/viewCommunityProfile"
        component={MyCommunityProfile}
      />
    </div>
  );
};

export default Main;
