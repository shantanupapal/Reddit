import React, { Component } from "react";
import NavbarMain from "../Layout/NavbarMain";
// import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import "./MyCommunities.css";
import person from "../../images/person.svg";
import post from "../../images/post.svg";
import { Link } from "react-router-dom";

class MyCommunities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      communities: [
        {
          communityName: "abc",
          description: "test community",
          images: ["abc.jpg", "xyz.jpg"],
          rules: [
            {
              title: "rule 1",
              desc: "desc for rule 1",
            },
            {
              title: "rule 2",
              desc: "desc for rule 2",
            },
          ],
          communityMembers: [
            {
              _id: "12234",
              acceptStatus: true,
            },
            {
              _id: "23324343",
              acceptStatus: false,
            },
            {
              _id: "23324asdfsdaf343",
              acceptStatus: true,
            },
          ],
          posts: [],
          topics: [],
          votes: {},
          createdBy: "12234",
          createdAt: "12th Feb, 2021",
        },
        {
          communityName: "xyz",
          description: "test community 1",
          images: ["abcd.jpg", "xyzw.jpg"],
          rules: [
            {
              title: "rule 21",
              desc: "desc for rule 21",
            },
            {
              title: "rule 22",
              desc: "desc for rule 22",
            },
          ],
          communityMembers: [
            {
              _id: "12234",
              acceptStatus: true,
            },
            {
              _id: "23324343",
              acceptStatus: true,
            },
            {
              _id: "23324asdfsdaf343",
              acceptStatus: false,
            },
          ],
          posts: [],
          topics: [],
          votes: {},
          createdBy: "12234",
          createdAt: "13th Feb, 2021",
        },
      ],
    };
  }
  render() {
    return (
      <div className="container-fluid">
        <NavbarMain />
        <div className="container">
          <div>
            <div className="float-right mt-2 d-flex w-25">
              <span className="float-left w-25 mt-1">Sort By </span>
              <select className="form-control">
                <option>Default</option>
                <option>Last Created</option>
                <option>Number of Posts</option>
                <option>Number of Users</option>
                <option>Ascending</option>
                <option>Descending</option>
              </select>
            </div>
            <h1 className="mt-2">My Communities</h1>
          </div>
          {this.state.communities.length > 0
            ? this.state.communities.map((value) => (
                <Card className="root">
                  <CardHeader
                    avatar={<Avatar aria-label="recipe">R</Avatar>}
                    title={
                      <Link
                        to={{
                          pathname: "/viewCommunityProfile",
                          state: { community: value },
                        }}
                        className="text-decoration-none text-dark text-uppercase"
                      >
                        {value.communityName}
                      </Link>
                    }
                    subheader={value.createdAt}
                  />
                  {/* <CardMedia
                    className={classes.media}
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                     /> */}
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {value.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton>
                      <img
                        src={person}
                        alt="person"
                        height="15"
                        width="15"
                        className="person-img"
                      ></img>
                    </IconButton>
                    {value.communityMembers.length}
                    <IconButton>
                      <img
                        src={post}
                        alt="person"
                        height="15"
                        width="15"
                        className="post-img"
                      ></img>
                    </IconButton>
                    {value.posts.length}
                  </CardActions>
                </Card>
              ))
            : ""}
        </div>
      </div>
    );
  }
}

export default MyCommunities;
