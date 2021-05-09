import React, { Component } from "react";
import NavbarMain from "../../Layout/NavbarMain";
import sidebar from "../../../images/community-sidebar.png";
import { backendURI } from "../../../utils/config";
import axios from "axios";
import swal from "sweetalert";

class CreateCommunity extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	onSubmit = (e) => {
		//prevent page from refresh
		e.preventDefault();

		console.log("inside create community");

		const communityData = {
			createdBy: localStorage.getItem("userid"),
			communityName: this.state.name,
			topic: this.state.topics,
			description: this.state.description,
		};

		console.log("community Data", communityData);
		axios.defaults.withCredentials = true;
		axios
			.post(`${backendURI}/api/createcommunity`, communityData)
			.then((response) => {
				console.log("response data from update user is", response);
				if (response.status === 200) {
					swal("Success", "Community created Successfully!", "success");
				}
			})
			.catch((error) => {
				console.log("error:", error);
				swal("Oops!", "Community name is taken!", "error");
			});
	};

	render() {
		return (
			<div className="container-fluid">
				<NavbarMain />
				<div className="container float-left">
					<div className="row">
						<div className="col-lg-2">
							<img src={sidebar} alt="sidebar" className="img-fluid" />
						</div>
						<div className="col-lg-10 pt-5">
							<h3>Create a Community</h3>
							<hr></hr>
							<form onSubmit={this.onSubmit}>
								<div className="form-row">
									<div className="col-lg-7">
										<h4>
											<label htmlFor="name">Name</label>
										</h4>
										<span style={{ color: "grey" }}>
											Community names including capitalization cannot be
											changed.
										</span>
										<input
											name="name"
											id="name"
											type="text"
											placeholder="Community Name"
											className="form-control my-3 p-4"
											onChange={this.onChange}
											required
										/>
									</div>
								</div>

								<div className="form-row">
									<div className="col-lg-7">
										<h4>
											<label htmlFor="topics">Topics</label>
										</h4>
										<span style={{ color: "grey" }}>
											This will help relevant users find your community.
										</span>
										<select
											id="topics"
											name="topics"
											className="form-control my-3"
											onChange={this.onChange}
										>
											<option value="" selected disabled hidden>
												Select Topic
											</option>
											<option value="Animals and Pets">Animals and Pets</option>
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
								</div>

								<div className="form-row">
									<div className="col-lg-7">
										<h4>
											<label htmlFor="description">Description</label>
										</h4>
										<span style={{ color: "grey" }}>
											This is how new members come to understand your community.
										</span>
										<textarea
											id="description"
											name="description"
											type="text"
											className="form-control my-3 p-4"
											onChange={this.onChange}
											required
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="col-lg-7">
										<button
											className="btn btn-primary btn-lg"
											style={{ borderRadius: "25px" }}
										>
											Create Community
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateCommunity;
