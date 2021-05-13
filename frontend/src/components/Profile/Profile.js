"use strict";
import React, { Component } from "react";
import NavbarMain from "../Layout/NavbarMain";
import axios from "axios";
import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUser, updateUser } from "../../redux/actions/userProfileActions";
import { backendURI } from "../../utils/config";
import "./profile.css";
class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: localStorage.getItem("userid"),
			topicOptions: [
				{ name: "Animals and Pets", value: "animalandpets" },
				{ name: "Art", value: "arts" },
				{ name: "Beauty and Makeup", value: "beautyandmakeup" },
				{ name: "Crypto", value: "crypto" },
				{ name: "Culture", value: "culture" },
				{ name: "Fashion", value: "fashion" },
				{ name: "History", value: "history" },
				{ name: "Fashion", value: "fashion" },
				{ name: "Health", value: "health" },
				{ name: "History", value: "history" },
				{ name: "Politics", value: "politics" },
				{ name: "Programming", value: "programming" },
				{ name: "Travel", value: "travel" },
				{ name: "World News", value: "worldnews" },
			],
			selectedTopics: [],
		};
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	onImageChange = (e) => {
		this.setState({
			file: e.target.files[0],
			fileText: e.target.files[0].name,
		});
	};

	onSelect = (data) => {
		this.setState({
			selectedTopics: data,
		});
		console.log("selected", this.state.selectedTopics);
	};
	componentDidMount() {
		const user = { userid: localStorage.getItem("userid") };
		console.log("current user ID: ", user);
		this.props.getUser(user);
	}

	onSubmit = (e) => {
		e.preventDefault();
		let selectedTopics = this.state.selectedTopics;
		console.log("selectedTopics: ", selectedTopics);

		const updatedData = {
			userName: this.state.userName,
			gender: this.state.gender,
			location: this.state.location,
			description: this.state.description,
			userid: localStorage.getItem("userid"),
			topics: selectedTopics,
		};

		console.log("this  Data: ", updatedData);
		this.props.updateUser(updatedData);
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.user) {
			let { user } = nextProps;

			let userData = {
				userid: user.userid || this.state.userId,
				userName: user.userName || this.state.userName,
				userImage: user.userImage || this.state.userImage,
				gender: user.gender || this.state.gender,
				location: user.location || this.state.location,
				description: user.description || this.state.description,
				topics: user.topics || this.state.topics,
			};

			this.setState(userData);
			console.log("userData is : ", userData);
		}
	}

	onUpload = (e) => {
		console.log("inside upload");
		e.preventDefault();

		const formData = new FormData();

		formData.append("image", this.state.file);
		const uploadConfig = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		console.log("formData", formData);
		axios
			.post(
				`${backendURI}/api/uploads/${this.state.userId}`,
				formData,
				uploadConfig
			)
			.then((response) => {
				alert("Image uploaded successfully!");
				this.setState({
					fileText: "Choose file",
					userImage: response.data,
				});

				const user = { userid: localStorage.getItem("userid") };
				this.props.getUser(user);
			})
			.catch((err) => {
				console.log("Error" + err);
			});
	};

	render() {
		var imageSrc;
		console.log("image", this.state.userImage);
		if (this.state) {
			imageSrc = `${backendURI}/api/images/${this.state.userImage}`;
		}
		return (
			<div className="container-fluid">
				<NavbarMain />
				<div className="container mt-5">
					<div className="row">
						<div className="col-4">
							<img
								src={imageSrc}
								alt="profilepic"
								style={{
									height: "300px",
									width: "300px",
									marginTop: "80px",
								}}
							/>
							<div>
								<form onSubmit={this.onUpload}>
									<div class="form-group">
										<label htmlFor="image">Change your avatar: </label>
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

						<div className="col-6">
							<div class="card">
								<div class="card-body">
									<form onSubmit={this.onSubmit}>
										<div className="form-group">
											<label htmlFor="username">Your name</label>
											<input
												type="text"
												className="form-control"
												name="userName"
												id="userName"
												onChange={this.onChange}
												defaultValue={this.state.userName}
											/>
										</div>

										<div className="form-group">
											<label htmlFor="gender">Gender</label>
											<select
												id="gender"
												name="gender"
												className="form-control"
												onChange={this.onChange}
												value={this.state.gender}
											>
												<option value="" selected disabled hidden>
													Select Gender
												</option>
												<option value="male">Male</option>
												<option value="female">Female</option>
												<option value="other">Other</option>
											</select>
										</div>

										<div className="form-group">
											<label htmlFor="location">Location</label>
											<input
												type="text"
												name="location"
												className="form-control"
												id="location"
												onChange={this.onChange}
												defaultValue={this.state.location}
											/>
										</div>

										<div className="form-group">
											<label htmlFor="description">Description</label>
											<input
												type="text"
												name="description"
												className="form-control"
												id="description"
												required
												onChange={this.onChange}
												defaultValue={this.state.description}
											/>
										</div>

										<div className="form-group">
											<label htmlFor="topics">Topics</label>

											<Multiselect
												options={this.state.topicOptions} // Options to display in the dropdown
												selectedValues={this.state.topics} // Preselected value to persist in dropdown
												onSelect={this.onSelect}
												displayValue="name"
												placeholder="Select Topics"
												id="multiselect-custom"
											/>
										</div>

										<button
											type="submit"
											className="btn btn-primary float-md-right"
										>
											Save
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	getUser: PropTypes.func.isRequired,
	updateUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: state.userProfile.user,
	};
};

export default connect(mapStateToProps, { getUser, updateUser })(Profile);
