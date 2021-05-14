import React, { Component } from "react";
import theme from "../../images/theme-blue.jpg";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { backendURI } from "../../utils/config";
import { userLogout } from "../../redux/actions/loginAction";
import axios from "axios";
import "./profile.css";
import swal from "sweetalert";
class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectFlag: false,
		};
	}

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		console.log("Client Log: change password");

		if (this.state.password === this.state.passwordConfirm) {
			console.log("Passwords are same");
			let resetData = {
				userid: localStorage.getItem("userid"),
				password: this.state.password,
			};
			axios.defaults.withCredentials = true;
			axios.defaults.headers.common["authorization"] =
				localStorage.getItem("token");
			axios
				.post(`${backendURI}/api/profile/changepassword`, resetData)
				.then((response) => {
					console.log("response after post", response);
					if (response.status === 200) {
						swal("Password changed sucessfully, Login again!", {
							icon: "success",
						});
						window.localStorage.clear();
						this.props.userLogout();
						//return <Redirect to="/Login" />;
						//this.props.history.push("/Login");
						this.setState({
							redirectFlag: true,
						});
					}
				})
				.catch((error) => {
					swal("Error", "Failed to change password, try again later", "error");
					console.log("error:", error);
				});
		} else {
			swal("Error", "Password details does not match", "error");
		}
	};

	render() {
		let redirectVar = null;
		let displayMessage = "";
		if (!localStorage.getItem("token")) {
			redirectVar = <Redirect to="/Login" />;
		}

		if (this.state.redirectFlag) {
			redirectVar = <Redirect to="/Login" />;
		}

		return (
			<div
				className="login-form"
				style={{
					padding: "0",
					margin: "0",
					boxSizing: "border-box",
					marginTop: "200px",
				}}
			>
				{redirectVar}
				<section className="form my-4 mx-5">
					<div className="container">
						<div className="row no-gutters auth-row">
							<div className="col-lg-5">
								<img src={theme} alt="theme" className="img-fluid theme" />
							</div>
							<div className="col-lg-7 px-5 pt-5">
								<h4>Reset Password</h4>
								<form onSubmit={this.handleSubmit}>
									<div className="form-row">
										<div className="col-lg-7">
											<input
												id="password"
												type="password"
												placeholder="Enter new password"
												className="form-control my-3 p-4"
												required
												onChange={this.onChange}
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="col-lg-7">
											<input
												id="passwordConfirm"
												type="password"
												placeholder="Confirm password"
												className="form-control my-3 p-4"
												required
												onChange={this.onChange}
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="col-lg-7">
											<button className="btn1 mt-3 mb-5">Submit</button>
										</div>
									</div>

									<div style={{ color: "#ff0000" }}>{displayMessage}</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default connect(null, { userLogout })(ChangePassword);
