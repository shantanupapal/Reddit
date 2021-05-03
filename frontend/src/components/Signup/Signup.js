import React, { Component } from "react";
import theme from "../../images/theme-blue.jpg";
import { Link } from "react-router-dom";
import "./signup.css";
class Signup extends Component {
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
								<img src={theme} alt="" className="img-fluid theme" />
							</div>
							<div className="col-lg-7 px-5 pt-5">
								<h4>Sign Up</h4>
								<form action="">
									<div className="form-row">
										<div className="col-lg-7">
											<input
												type="text"
												placeholder="EMAIL"
												className="form-control my-3 p-4"
												pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$"
												title="Please enter valid email address"
												required
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="col-lg-7">
											<input
												type="text"
												placeholder="CHOOSE A USERNAME"
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
								</form>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default Signup;
