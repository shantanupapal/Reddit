import React, { Component } from "react";
import theme from "../../images/theme-blue.jpg";
import { Link } from "react-router-dom";
import "./login.css";
class Login extends Component {
	render() {
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
				<section className="form my-4 mx-5">
					<div className="container">
						<div className="row no-gutters auth-row">
							<div className="col-lg-5">
								<img src={theme} alt="theme" className="img-fluid theme" />
							</div>
							<div className="col-lg-7 px-5 pt-5">
								<h4>Login</h4>
								<form action="">
									<div className="form-row">
										<div className="col-lg-7">
											<input
												type="text"
												placeholder="USERNAME"
												className="form-control my-3 p-4"
												required
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="col-lg-7">
											<input
												type="password"
												placeholder="PASSWORD"
												className="form-control my-3 p-4"
												required
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
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Login;
