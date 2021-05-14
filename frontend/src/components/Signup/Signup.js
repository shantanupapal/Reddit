import React, { Component } from "react";
import theme from "../../images/theme-blue.jpg";
import { Link } from "react-router-dom";
import userSignup from "../../redux/actions/signupAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import jwtDecode from "jwt-decode";
import "./signup.css";
class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleSignUp = (e) => {
		e.preventDefault();
		console.log("In handleSignUp");

		const signUpData = {
			userName: this.state.userName,
			email: this.state.email,
			password: this.state.password,
		};

		console.log("signup data received in client", signUpData);
		this.props.userSignup(signUpData);
		this.setState({
			signupFlag: 1,
		});
	};
	render() {
		let displayMessage = "";
		let redirectVar = null;
		//console.log("this.props.user", this.props.user);
		if (this.props.user) {
			if (this.props.user && this.props.user.token) {
				localStorage.setItem("token", this.props.user.token);
				const authToken = this.props.user.token;
				const jwt = authToken.split(" ")[1];
				let userData = jwtDecode(jwt);
				if (userData) {
					console.log("userData is:", userData);
					localStorage.setItem("userid", userData.userid);
					localStorage.setItem("email", userData.email);
					localStorage.setItem("userName", userData.userName);
					console.log("Redirecting to home");
					redirectVar = <Redirect to="/Dashboard" />;
				}
			} else if (this.props.user === "EMAIL_EXISTS" && this.state.signupFlag) {
				displayMessage =
					"This Email id is already registered with us, Please use different Email id";
			} else if (this.props.user === "SERVER_ERROR") {
				displayMessage = "Something went wrong";
			}
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
								<img src={theme} alt="" className="img-fluid theme" />
							</div>
							<div className="col-lg-7 px-5 pt-5">
								<h4>Sign Up</h4>
								<form onSubmit={this.handleSignUp}>
									<div className="form-row">
										<div className="col-lg-7">
											<input
												id="userName"
												type="text"
												placeholder="NAME"
												className="form-control my-3 p-4"
												required
												onChange={this.onChange}
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="col-lg-7">
											<input
												id="email"
												type="text"
												placeholder="EMAIL"
												className="form-control my-3 p-4"
												pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
												title="Please enter valid email address"
												required
												onChange={this.onChange}
											/>
										</div>
									</div>

									<div className="form-row">
										<div className="col-lg-7">
											<input
												id="password"
												type="password"
												placeholder="PASSWORD"
												className="form-control my-3 p-4"
												required
												onChange={this.onChange}
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="col-lg-7">
											<button className="btn1 mt-3 mb-5">Sign up</button>
										</div>
									</div>

									<p>
										Already a redditor?{" "}
										<Link
											to="/Login"
											style={{ fontWeight: "bold", fontSize: "20px" }}
										>
											LOG IN
										</Link>
									</p>
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

Signup.propTypes = {
	userSignup: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: state.authuser.user,
	};
};

export default connect(mapStateToProps, { userSignup })(Signup);
