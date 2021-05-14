import React, { Component } from "react";
import NavbarMain from "../Layout/NavbarMain";
import axios from "axios";
import { backendURI } from "../../utils/config";
import { Link } from "react-router-dom";
class ViewProfile extends Component {
	state = {
		user_id: localStorage.getItem("user_id"),
		userData: {},
		communityData: {},
	};

	getImage = (img) => {
		console.log("img is", img);
		return `${backendURI}/api/images/${img}`;
	};

	componentDidMount() {
		//To get userDetails
		const userid = this.props.match.params.userid;
		axios.defaults.headers.common["authorization"] =
			localStorage.getItem("token");
		axios
			.get(`${backendURI}/api/profile/getuserprofile/${userid}`)
			.then((response) => {
				console.log("response after post getuserprofile", response);
				if (response.status === 200) {
					this.setState({
						userData: response.data,
					});
				}
			})
			.catch((error) => {
				console.log("error:", error);
			});
		//to get community details
		axios
			.get(`${backendURI}/api/viewprofile/getCommunities/${userid}`)
			.then((response) => {
				console.log("response after post getuserprofile", response);
				if (response.status === 200) {
					this.setState({
						communityData: response.data,
					});
				}
			})
			.catch((error) => {
				console.log("error:", error);
			});
	}
	render() {
		console.log("userData is: ", this.state.userData);
		console.log("communityData is: ", this.state.communityData);
		let communityList = this.state.communityData;
		let topics = this.state.userData.topics;
		let topicNames =
			topics && topics.length > 0
				? Array.prototype.map.call(topics, (s) => s.name).toString()
				: "none";
		return (
			<div classNameName="conatiner-fluid">
				<NavbarMain />
				<div className="container mt-2">
					<div className="main-body">
						<div className="row gutters-sm">
							<div className="col-md-4 mb-3">
								<div className="card">
									<div className="card-body">
										<div className="d-flex flex-column align-items-center text-center">
											<img
												src={this.getImage(this.state.userData.userImage)}
												alt="userProfile"
												className="rounded-circle"
												style={{
													border: "1px solid #555",
													width: "180px",
													height: "180px",
												}}
											/>
											<div className="mt-3">
												<h4>{this.state.userData.userName}</h4>
												<p className="text-secondary mb-1">
													{this.state.userData.description}
												</p>
												<p className="text-muted font-size-sm">
													{this.state.userData.location}
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="card mt-3">
									<ul className="list-group list-group-flush">
										<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
											<span>
												<h6>Communities</h6>
											</span>
										</li>
										{communityList && communityList.length > 0 ? (
											<>
												{communityList.map((c) => (
													<>
														<Link
															className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
															to={{
																pathname: `/community/${c.communityName}`,
															}}
														>
															<span className="text-secondary">
																r/{c.communityName}
															</span>
														</Link>
													</>
												))}
											</>
										) : (
											<span className="text-secondary">{"No Communities"}</span>
										)}
									</ul>
								</div>
							</div>
							<div className="col-md-8">
								<div className="card mb-3">
									<div className="card-body">
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Full Name</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												{this.state.userData.userName}
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Email</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												{this.state.userData.email}
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Gender</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												{this.state.userData.gender}
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Location</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												{this.state.userData.location}
											</div>
										</div>
										<hr />
										<div className="row">
											<div className="col-sm-3">
												<h6 className="mb-0">Interested Topics</h6>
											</div>
											<div className="col-sm-9 text-secondary">
												{topicNames}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ViewProfile;
