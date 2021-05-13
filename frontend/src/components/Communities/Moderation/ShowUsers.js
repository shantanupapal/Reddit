//import React, { useState } from "react";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import swal from "sweetalert";
import { backendURI } from "../../../utils/config";
import { getAllCommunities } from "../../../redux/actions/moderationActions";
import "./showusers.css";

class ShowUsers extends Component {
	state = {
		showPopUp: false,
		userList: [],
		userId: localStorage.getItem("userid"),
	};

	handleClose = () => {
		this.setState({ showPopUp: false });
	};

	handleShow = () => {
		this.setState({ showPopUp: true });
	};

	getRequestedUsers = (members) => {
		return members.filter((value) => value.acceptStatus === 0);
	};

	getImage = (img) => {
		console.log("img is", img);
		return `${backendURI}/api/images/${img}`;
	};

	onSubmitHandler = (e) => {
		e.preventDefault();
		const user = { userid: this.state.userId };

		let selectedUsers = this.state.userList;
		console.log("users data on Submit: ", selectedUsers);
		if (selectedUsers && selectedUsers.length > 0) {
			axios.defaults.withCredentials = true;
			let data = {
				communityId: this.props.community._id,
				userList: selectedUsers,
			};
			console.log("data to post: ", data);
			// axios.defaults.headers.common["authorization"] =
			// 	localStorage.getItem("token");
			axios
				.post(`${backendURI}/api/moderation/acceptuserrequest`, data)
				.then((response) => {
					console.log("response after post acceptuserrequest", response);
					if (response.status === 200) {
						swal("Users added to the community sucecssfully!", {
							icon: "success",
						});
						this.props.getAllCommunities(user);
					}
				})
				.catch((error) => {
					swal("Failed to add users to community", "error");
					console.log("error:", error);
				});
		} else {
			console.log("No users selected");
		}
		this.handleClose();
	};

	render() {
		let members = this.getRequestedUsers(this.props.community.communityMembers);
		return (
			<div>
				<div>
					<button onClick={this.handleShow}>
						{this.props.community.communityName}
					</button>
				</div>

				<Modal
					show={this.state.showPopUp}
					onHide={this.handleClose}
					animation={false}
					centered
				>
					<div>
						<Modal.Header closeButton className="modal-header modal-head">
							<Modal.Title className="text-center">User Requests</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className="container">
								<div>
									<form className="form" onSubmit={this.onSubmitHandler}>
										{members && members.length > 0 ? (
											<div>
												{members.map((memb) => (
													<div className="row">
														<li className="list-group list-group-horizontal user-list">
															<div>
																<img
																	src={this.getImage(memb._id.userImage)}
																	alt="profilepic"
																	className="user-list-pic"
																/>
															</div>
															<div>
																<input
																	type="checkbox"
																	value={memb._id._id}
																	className="list-checkbox"
																	onChange={() => {
																		let arr = this.state.userList;
																		if (arr.includes(memb._id._id)) {
																			arr.pop(memb._id._id);
																		} else {
																			arr.push(memb._id._id);
																		}
																		this.setState({
																			userList: arr,
																		});
																	}}
																/>
																{memb._id.userName}
															</div>
														</li>
													</div>
												))}
											</div>
										) : (
											<h5 className="text-danger">No User requests</h5>
										)}

										<div className="row mt-5">
											<button
												type="submit"
												onClick={this.handleClose}
												className="float -left btn btn-secondary "
											>
												close
											</button>
											<button
												type="submit"
												className="float-right btn btn-primary"
											>
												Save
											</button>
										</div>
									</form>
								</div>
							</div>
						</Modal.Body>
					</div>
				</Modal>
			</div>
		);
	}
}

export default connect(null, { getAllCommunities })(ShowUsers);
