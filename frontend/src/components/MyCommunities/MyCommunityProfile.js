import React, { Component } from "react";
import NavbarMain from "../Layout/NavbarMain";
// import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./MyCommunities.css";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import logo from "../../images/default_logo.png";
import { connect } from "react-redux";
import {
	addRule,
	updateDesc,
	deleteCommunity,
	getCommunityById,
	getCommunity,
} from "../../redux/actions/myCommunityActions";

function MyVerticallyCenteredModal(props) {
	return (
		<Modal
			{...props}
			// size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Add Rule</Modal.Title>
			</Modal.Header>
			<form onSubmit={props.addRule}>
				<Modal.Body>
					<div>
						<div className="col-lg-11">
							<h4>
								<label htmlFor="name">Title</label>
							</h4>
							<input
								name="title"
								id="title"
								type="text"
								placeholder="Rule Title"
								className="form-control my-3 p-4"
								onChange={props.onRuleAdd}
								required
							/>
						</div>
					</div>

					<div>
						<div className="col-lg-11">
							<h4>
								<label htmlFor="description">Description</label>
							</h4>
							<textarea
								id="description"
								name="description"
								type="text"
								className="form-control my-3 p-4"
								placeholder="Rule Description"
								onChange={props.onRuleAdd}
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
			myCommunity: {},
			red: "",
		};
		this.handleEdit = this.handleEdit.bind(this);
		this.setModalShowTrue = this.setModalShowTrue.bind(this);
		this.setModalShowFalse = this.setModalShowFalse.bind(this);
		this.leaveCommunity = this.leaveCommunity.bind(this);
		this.addRule = this.addRule.bind(this);
	}

	componentDidMount() {
		console.log("in here");
		const data = {
			community_id: this.props.location.state.community.communityId,
		};
		console.log("comm id", data.community_id);
		this.props.getCommunityById(data);
	}

	componentWillReceiveProps(nextProps) {
		console.log("----------", nextProps);
		if (nextProps.myCommunity) {
			// let { myCommunity } = nextProps;
			// let communityDetails = {
			//   communities: myCommunity,
			// };
			this.setState({
				myCommunity: nextProps.myCommunity[0],
			});
			console.log(this.state.myCommunity);
			// this.setState(communityDetails);
			// console.log("userData is : ", communityDetails);
		}
	}

	handleEdit = (e) => {
		e.preventDefault();
		this.setState({
			descriptionEdit: !this.state.descriptionEdit,
		});
	};

	onRuleAdd = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
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

	changeDescription = async (e) => {
		e.preventDefault();
		const data = {
			community_id: this.state.myCommunity.communityId,
			desc: this.state.desc,
		};
		await this.props.updateDesc(data);
		this.setState({
			descriptionEdit: !this.state.descriptionEdit,
		});
		const data1 = {
			community_id: this.props.location.state.community.communityId,
		};
		console.log("comm id", data.community_id);
		this.props.getCommunityById(data1);
		console.log(
			"sadfsadfsdafsadfsadfsadfsadfsdfsdafsadf",
			this.state.myCommunity
		);
		this.setState({
			red: (
				<Redirect
					to={{
						pathname: "/viewCommunityProfile",
						state: { community: this.state.myCommunity },
					}}
				/>
			),
		});
	};

	leaveCommunity = async (e) => {
		e.preventDefault();
		const data = {
			community_id: this.state.myCommunity.communityId,
		};
		await this.props.deleteCommunity(data);
		const user = localStorage.getItem("userid");
		console.log("current user ID: ", user);
		const data1 = {
			user: user,
		};
		this.props.getCommunity(data1);
		this.setState({
			red: <Redirect to="/mycommunities" />,
		});
	};

	addRule = async (e) => {
		e.preventDefault();
		const data = {
			community_id: this.state.myCommunity.communityId,
			title: this.state.title,
			desc: this.state.description,
		};
		console.log("rule data: ", data);
		await this.props.addRule(data);
		this.setState({
			setModalShow: false,
		});
		const data1 = {
			community_id: this.props.location.state.community.communityId,
		};
		console.log("comm id", data.community_id);
		this.props.getCommunityById(data1);
		this.setState({
			red: (
				<Redirect
					to={{
						pathname: "/viewCommunityProfile",
						state: { community: this.state.myCommunity },
					}}
				/>
			),
		});
	};

	render() {
		console.log("....", this.props.location.state.community);
		let list = this.state.myCommunity;
		console.log("comminaonio", list);
		let red = this.state.red;
		console.log("sdafsdafsdf", this.state.red);
		return (
			<div className="container-fluid">
				{red}
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
							avatar={
								<img
									src={logo}
									alt="profilepic"
									style={{
										height: "50px",
										width: "50px",
										marginTop: "8px",
										borderRadius: "50%",
									}}
								/>
							}
							title={"r/" + this.state.myCommunity.communityName}
							subheader={
								this.state.myCommunity.createdAt &&
								this.state.myCommunity.createdAt.length > 0
									? this.state.myCommunity.createdAt.split("T")[0]
									: ""
							}
						/>

						{/* <CardMedia
              className={classes.media}
              image="/static/images/cards/paella.jpg"
              title="Paella dish"
            /> */}
						<hr />
						<CardContent>
							<div className="d-flex mb-5">
								<div
									style={{
										width: "80%",
									}}
								>
									{!this.state.descriptionEdit ? (
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											<div className="text-justify">
												{this.state.myCommunity.description}
											</div>
											<button
												className="btn btn-secondary mt-3"
												onClick={this.handleEdit}
											>
												Edit Description
											</button>
										</Typography>
									) : (
										<div>
											<textarea
												className="w-75 p-2 text-justify"
												name="desc"
												id="desc"
												style={{
													border: "inset",
												}}
												onChange={this.onRuleAdd}
											>
												{this.state.myCommunity.description}
											</textarea>
											<br />
											<button
												className="btn btn-success mt-3"
												onClick={this.changeDescription}
											>
												Submit
											</button>
										</div>
									)}
								</div>
								<div className="ml-5">
									<img
										src={logo}
										alt="profilepic"
										style={{
											height: "50px",
											width: "50px",
											marginTop: "8px",
										}}
									/>
									<form className="my-5" onSubmit={this.onUpload}>
										<div class="form-group">
											<label htmlFor="image">
												Change your community logo:{" "}
											</label>
											<input
												type="file"
												className="form-control-file"
												name="image"
												accept="image/*"
												onChange={this.onImageChange}
												id="profileimg"
												required
											/>
										</div>
										<button type="submit" className="btn btn-primary">
											Upload
										</button>
									</form>
								</div>
							</div>
							<hr />
							<div className="mt-4">
								<h5>Rules</h5>
								{this.state.myCommunity.rules &&
								this.state.myCommunity.rules.length > 0
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
									onRuleAdd={this.onRuleAdd}
								/>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}
}

MyCommunityProfile.propTypes = {
	getCommunityById: PropTypes.func.isRequired,
	myCommunityById: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	console.log("on frontedn", state.myCommunity.myCommunityById);
	return {
		myCommunity: state.myCommunity.myCommunityById,
	};
};

export default connect(mapStateToProps, {
	addRule,
	updateDesc,
	deleteCommunity,
	getCommunityById,
	getCommunity,
})(MyCommunityProfile);
