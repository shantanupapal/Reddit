import React from "react";
import { Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Profile from "./Profile/Profile";
import CreateCommunity from "./Communities/CreateCommunity/CreateCommunity";
import CommunityHome from "./Communities/CommunityHome";
import ChangePassword from "./Profile/ChangePassword";
import Moderation from "./Communities/Moderation/Moderation";
import Chat from "./Chat/Chat";
import Invitation from "./Invitation";
import MyCommunities from "./MyCommunities/MyCommunities";
import ViewCommunity from "./MyCommunities/MyCommunityProfile";
import Dashboard from "./Dashboard";
import MyCommunityAnalytics from "./MyCommunities/MyCommunityAnalytics";

const Main = () => {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Signup" component={Signup} />
      <Route exact path="/Profile" component={Profile} />
      <Route exact path="/CreateCommunity" component={CreateCommunity} />
      <Route exact={false} path="/community/:name" component={CommunityHome} />

      <Route exact path="/ChangePassword" component={ChangePassword} />
      <Route exact path="/Moderation" component={Moderation} />
      <Route exact path="/Chat" component={Chat} />
      <Route exact path="/Invitation" component={Invitation} />
      <Route exact path="/MyCommunities" component={MyCommunities} />
      <Route exact path="/viewCommunityProfile" component={ViewCommunity} />
      <Route exact path="/Dashboard" component={Dashboard} />
      <Route
        exact
        path="/MyCommunityAnalytics"
        component={MyCommunityAnalytics}
      />
    </div>
  );
};

export default Main;
