import React, { Component } from "react";
import NavbarMain from "../Layout/NavbarMain";
import "./MyCommunities.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Plot from "react-plotly.js";
import { getCommunity } from "../../redux/actions/myCommunityActions";

class MyCommunityAnalytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("userid"),
      communities: [],
      communityName: [],
      totalUsers: [],
      totalPosts: [],
    };
  }

  componentDidMount() {
    const user = localStorage.getItem("userid");
    console.log("current user ID: ", user);
    const data = {
      user: user,
    };
    this.props.getCommunity(data);
  }

  componentWillReceiveProps(nextProps) {
    console.log("----------", nextProps);
    if (nextProps.myCommunity) {
      this.setState({
        communities: nextProps.myCommunity,
      });
    }
    let totalUsers = [];
    let totalPosts = [];
    let communityName = [];
    console.log("cdata ---------------comm", nextProps.myCommunity);
    for (let i = 0; i < nextProps.myCommunity.length; i++) {
      communityName.push(nextProps.myCommunity[i].communityName);
      totalUsers.push(nextProps.myCommunity[i].joinedUsers);
      totalPosts.push(nextProps.myCommunity[i].totalPost);
    }
    console.log("----00---", communityName, totalUsers, totalPosts);
    this.setState({
      communityName: communityName,
      totalUsers: totalUsers,
      totalPosts: totalPosts,
    });
  }

  render() {
    let list = this.state.communities;
    console.log("comminaonio", list);
    return (
      <div className="container-fluid">
        <NavbarMain />
        <div className="container">
          <Plot
            data={[
              {
                x: this.state.communityName,
                y: this.state.totalUsers,
                type: "bar",
                name: "Total Users",
              },
              {
                type: "bar",
                x: this.state.communityName,
                y: this.state.totalPosts,
                name: "Total Posts",
              },
            ]}
            layout={{
              width: 1020,
              height: 740,
              title: "A Fancy Plot",
              barmode: "group",
            }}
          />
        </div>
      </div>
    );
  }
}

MyCommunityAnalytics.propTypes = {
  getCommunity: PropTypes.func.isRequired,
  myCommunity: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    myCommunity: state.myCommunity.myCommunity,
  };
};

export default connect(mapStateToProps, { getCommunity })(MyCommunityAnalytics);
