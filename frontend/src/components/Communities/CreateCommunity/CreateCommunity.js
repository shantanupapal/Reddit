import React, { Component } from "react";
import NavbarMain from "../../Layout/NavbarMain";
import sidebar from "../../../images/community-sidebar.png";

class CreateCommunity extends Component {
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
							<form action="">
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
											className="form-control my-3 p-4"
											onChange={this.onChange}
										>
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
