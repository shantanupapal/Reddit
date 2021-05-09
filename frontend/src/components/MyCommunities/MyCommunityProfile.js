import React, { Component } from "react";
import NavbarMain from "../Layout/NavbarMain";
// import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import "./MyCommunities.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Rule</Modal.Title>
      </Modal.Header>
      <form onSubmit={props.addRule}>
        <Modal.Body>
          <div className="form-row">
            <div className="col-lg-7">
              <h4>
                <label htmlFor="name">Title</label>
              </h4>
              <input
                name="name"
                id="name"
                type="text"
                placeholder="Rule Title"
                className="form-control my-3 p-4"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="col-lg-7">
              <h4>
                <label htmlFor="description">Description</label>
              </h4>
              <textarea
                id="description"
                name="description"
                type="text"
                className="form-control my-3 p-4"
                placeholder="Rule Description"
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <input class="btn btn-primary" type="submit" value="Add" />
          <Button onClick={props.onHide} className="btn btn-danger">
            Close
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

class MyCommunityProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionEdit: false,
      modalShow: false,
      setModalShow: false,
      myCommunity: this.props.location.state.community,
      red: "",
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.setModalShowTrue = this.setModalShowTrue.bind(this);
    this.setModalShowFalse = this.setModalShowFalse.bind(this);
    this.leaveCommunity = this.leaveCommunity.bind(this);
    this.addRule = this.addRule.bind(this);
  }
  handleEdit = (e) => {
    e.preventDefault();
    this.setState({
      descriptionEdit: !this.state.descriptionEdit,
    });
  };

  setModalShowTrue = (e) => {
    e.preventDefault();
    this.setState({
      setModalShow: true,
    });
  };

  setModalShowFalse = () => {
    this.setState({
      setModalShow: false,
    });
  };

  leaveCommunity = () => {
    alert("community left");
    this.setState({
      red: <Redirect to="/mycommunities" />,
    });
  };

  addRule = () => {
    alert("rule added");
  };

  render() {
    console.log("....", this.state.myCommunity);
    return (
      <div className="container-fluid">
        {this.state.red}
        <NavbarMain />
        <div className="container">
          <Card className="root">
            <button
              className="btn btn-danger m-4 float-right"
              onClick={this.leaveCommunity}
            >
              Leave
            </button>
            <CardHeader
              className="community-title"
              avatar={<Avatar aria-label="recipe">R</Avatar>}
              title={this.state.myCommunity.communityName}
              subheader={this.state.myCommunity.createdAt}
            />

            {/* <CardMedia
              className={classes.media}
              image="/static/images/cards/paella.jpg"
              title="Paella dish"
            /> */}
            <CardContent>
              {!this.state.descriptionEdit ? (
                <Typography variant="body2" color="textSecondary" component="p">
                  <div>{this.state.myCommunity.description}</div>
                  <button
                    className="btn btn-secondary mt-3"
                    onClick={this.handleEdit}
                  >
                    Edit Description
                  </button>
                </Typography>
              ) : (
                <div>
                  <textarea className="w-50 p-2">
                    {this.state.myCommunity.description}
                  </textarea>
                  <br />
                  <button className="btn btn-success mt-3">Submit</button>
                </div>
              )}
              <div className="mt-4">
                <h5>Rules</h5>
                {this.state.myCommunity.rules.length > 0
                  ? this.state.myCommunity.rules.map((value) => (
                      <CardHeader
                        className="rules-font"
                        title={value.title}
                        subheader={value.desc}
                      />
                    ))
                  : ""}
                <button
                  className="btn btn-primary mt-3"
                  onClick={this.setModalShowTrue}
                >
                  Add Rule
                </button>
                <MyVerticallyCenteredModal
                  show={this.state.setModalShow}
                  onHide={this.setModalShowFalse}
                  addRule={this.addRule}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default MyCommunityProfile;
