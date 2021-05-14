import React, { Component } from "react";
import NavbarMain from "../Layout/NavbarMain";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import "./MyCommunities.css";
import person from "../../images/person.svg";
import post from "../../images/post.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import logo from "../../images/default_logo.png";
import { getCommunity } from "../../redux/actions/myCommunityActions";

class MyCommunities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("userid"),
      communities: [],
      currentPage: 1,
      itemsPerPage: 5,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log(e);
    this.setState({
      currentPage: Number(e),
    });
  }

  componentDidMount() {
    const user = localStorage.getItem("userid");
    console.log("current user ID: ", user);
    const data = {
      user: user,
    };
    this.props.getCommunity(data);
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  sortBy = () => {
    if (this.state.sortBy === "Ascending") {
      let communitiesSort = this.state.communities;
      communitiesSort.sort();
      this.setState({
        communities: communitiesSort,
      });
    }
  };
  getRequestedUsers = (members) => {
    return members.length > 0
      ? members.filter((value) => value.acceptStatus === 0).length
      : 0;
  };
  componentWillReceiveProps(nextProps) {
    console.log("----------", nextProps);
    if (nextProps.myCommunity) {
      // let { myCommunity } = nextProps;
      // let communityDetails = {
      //   communities: myCommunity,
      // };
      this.setState({
        communities: nextProps.myCommunity,
      });
      // this.setState(communityDetails);
      // console.log("userData is : ", communityDetails);
    }
  }

  render() {
    let list = this.state.communities;
    console.log("comminaonio", list);
    const currentPage = this.state.currentPage;
    const itemsPerPage = this.state.itemsPerPage;

    const indexOfLastTodo = currentPage * itemsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;

    const currentItems = list.slice(indexOfFirstTodo, indexOfLastTodo);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(list.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    let renderPageNumbers = null;

    renderPageNumbers = (
      <nav aria-label="Page navigation example" class="pagebar">
        <ul class="pagination">
          {pageNumbers.map((i) => (
            <li class="page-item">
              <a
                key={i}
                id={i}
                onClick={() => {
                  this.handleClick(i);
                }}
                class="page-link"
                href="#"
              >
                {i}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
    return (
      <div className="container-fluid">
        <NavbarMain />
        <div className="container">
          <div>
            <div className="float-right mt-2 d-flex w-25">
              <span className="float-left w-25 mt-1">Sort By </span>
              <select
                className="form-control"
                id="sortBy"
                onChange={this.onChange}
              >
                <option>Default</option>
                <option>Last Created</option>
                <option>Number of Posts</option>
                <option>Number of Users</option>
                <option value="Ascending">Ascending</option>
                <option>Descending</option>
              </select>
            </div>
            <h1 className="mt-2">My Communities</h1>
          </div>
          {currentItems && currentItems.length > 0
            ? currentItems.map((value) => (
                <Card className="root">
                  <CardHeader
                    avatar={
                      <img
                        src={logo}
                        alt="profilepic"
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    }
                    title={
                      <Link
                        to={{
                          pathname: "/viewCommunityProfile",
                          state: { community: value },
                        }}
                        className="text-decoration-none text-dark text-uppercase h3"
                      >
                        {value.communityName}
                      </Link>
                    }
                    subheader={value.createdAt.split("T")[0]}
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
                      className="text-justify"
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
                    {/* {value.joinedUsers} */}
                    {this.getRequestedUsers(value.joinedUsers)}
                    <IconButton>
                      <img
                        src={post}
                        alt="person"
                        height="15"
                        width="15"
                        className="post-img"
                      ></img>
                    </IconButton>
                    {value.totalPost}
                  </CardActions>
                </Card>
              ))
            : ""}
          <div className="mt-2">{renderPageNumbers}</div>
        </div>
      </div>
    );
  }
}

MyCommunities.propTypes = {
  getCommunity: PropTypes.func.isRequired,
  myCommunity: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    myCommunity: state.myCommunity.myCommunity,
  };
};

export default connect(mapStateToProps, { getCommunity })(MyCommunities);
