import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/reddit-logo.svg";
import "../../App.css";
import "./Navbar.css";
const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light">
			<div className="container-fluid">
				<div className="row">
					<img
						src={logo}
						className="logo"
						alt="logo"
						style={{ width: "150px", float: "left" }}
					/>
				</div>
				<ul className="nav navbar-nav navbar-right">
					<li>
						<Link
							to="/Login"
							className="btn btn-outline-primary btn-lg"
							style={{ borderRadius: "20px", marginRight: "20px" }}
						>
							Log In
						</Link>
					</li>
					<li>
						<Link
							to="/SignUp"
							className="btn btn-primary btn-lg"
							style={{ borderRadius: "20px" }}
						>
							Sign Up
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
