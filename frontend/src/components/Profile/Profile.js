import React, { Component } from "react";
import NavbarMain from "../Layout/NavbarMain";
import profilepic from "../../images/reddit-profile.png";
import { Multiselect } from "multiselect-react-dropdown";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUser, updateUser } from "../../redux/actions/userProfileActions";
import "./profile.css";
class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: localStorage.getItem("userid"),
			topicOptions: [
				{ name: "Animals and Pets" },
				{ name: "Art" },
				{ name: "Beauty and Makeup" },
				{ name: "Crypto" },
				{ name: "Culture" },
				{ name: "Fashion" },
				{ name: "History" },
				{ name: "Fashion" },
				{ name: "Health" },
				{ name: "History" },
				{ name: "Politics" },
				{ name: "Programming" },
				{ name: "Travel" },
				{ name: "World News" },
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
		console.log("selected", this.state.selectedMembers);
	};
	componentDidMount() {
		const user = { userid: localStorage.getItem("userid") };
		console.log("current user ID: ", user);
		this.props.getUser(user);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user) {
			let { user } = nextProps;

			let userData = {
				userid: user.userid || this.state.userId,
				userName: user.userName || this.state.userName,
				email: user.email || this.state.email,
				phone: user.phone || this.state.phone,
				userImage: user.userImage || this.state.userImage,
				gender: user.gender || this.state.gender,
				location: user.location || this.state.location,
				description: user.description || this.state.description,
				topics: user.description || this.state.topics,
			};

			this.setState(userData);
			console.log("userData is : ", userData);
		}
	}
	render() {
		return (
			<div className="container-fluid">
				<NavbarMain />
				<div className="container mt-5">
					<div className="row">
						<div className="col-4">
							<img
								src={profilepic}
								alt="profilepic"
								style={{
									height: "300px",
									width: "300px",
									marginTop: "80px",
								}}
							/>
							<div>
								<form>
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
									<form>
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
											/>
										</div>

										<div className="form-group">
											<label htmlFor="password">Password</label>
											<input
												type="password"
												name="password"
												className="form-control"
												id="password"
												required
												onChange={this.onChange}
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
