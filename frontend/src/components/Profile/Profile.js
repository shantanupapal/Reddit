import React, { Component } from "react";
import NavbarMain from "../Layout/NavbarMain";
import profilepic from "../../images/reddit-profile.png";
import "./profile.css";
class Profile extends Component {
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

	render() {
		return (
			<div className="container-fluid">
				<NavbarMain />
				<div className="container mt-5">
					<div className="row">
						<div className="row">
							<div className="col">
								<div class="card">
									<div class="card-body">
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
								</div>
							</div>
						</div>

						<div className="col">
							<div class="card">
								<div class="card-body">
									<form>
										<div className="col">
											<div className="form-group">
												<label htmlFor="username">Your name</label>
												<input
													type="text"
													className="form-control"
													name="username"
													id="username"
													onChange={this.onChange}
												/>
											</div>

											<div className="form-group">
												<label htmlFor="gender">Gender</label>
												<select
													name="gender"
													className="form-control"
													onChange={this.onChange}
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
												<br />
												<select
													name="topcs"
													className="form-control"
													onChange={this.onChange}
												>
													<option value="Animals and Pets">
														Animals and Pets
													</option>
													<option value="Art">Art</option>
													<option value="Beauty and Makeup">
														Beauty and Makeup
													</option>
													<option value="Crypto">Crypto</option>
													<option value="Culture">Culture</option>
													<option value="Fashion">Fashion</option>
													<option value="History">History</option>
													<option value="Health">Health</option>
													<option value="Politics">Politics</option>
													<option value="Programming">Programming</option>
													<option value="Travel">Travel</option>
													<option value="World News">World News</option>
												</select>
											</div>

											<button
												type="submit"
												className="btn btn-primary float-md-right"
											>
												Save
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>

						<div className="col">
							<div class="card">
								<div class="card-body">
									<h4>My communities</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;
