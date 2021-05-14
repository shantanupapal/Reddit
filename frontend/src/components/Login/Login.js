import React, { Component } from "react";
import theme from "../../images/theme-blue.jpg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { userLogin } from "../../redux/actions/loginAction";
import jwtDecode from "jwt-decode";
import "./login.css";
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		console.log("Client Log: In Login");

		const loginData = {
			email: this.state.email,
			password: this.state.password,
		};

		console.log("loginData", loginData);
		this.props.userLogin(loginData);
		this.setState({
			loginFlag: 1,
		});
	};

	render() {
		let redirectVar = null;
		let displayMessage = "";
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
				redirectVar = <Redirect to="/Profile" />;
			}
		} else if (this.props.user) {
			if (this.props.user === "NO_USER" && this.state.loginFlag) {
				displayMessage = "No user with given email id/password";
			} else if (
				this.props.user === "INCORRECT_PASSWORD" &&
				this.state.loginFlag
			) {
				displayMessage = "Password is incorrect";
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
								<img src={theme} alt="theme" className="img-fluid theme" />
							</div>
							<div className="col-lg-7 px-5 pt-5">
								<h4>Login</h4>
								<form onSubmit={this.handleSubmit}>
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
											<button className="btn1 mt-3 mb-5">Log In</button>
										</div>
									</div>

									<p>
										New to Reddit ?{" "}
										<Link
											to="/SignUp"
											style={{ fontWeight: "bold", fontSize: "20px" }}
										>
											Sign Up
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

Login.propTypes = {
	userLogin: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: state.authuser.user,
	};
};

export default connect(mapStateToProps, { userLogin })(Login);
