import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLogout } from "../../redux/actions/loginAction";
import icon from "../../images/reddit-icon.png";

class NavDropDown extends Component {
	constructor() {
		super();
		this.state = {
			userName: localStorage.getItem("userName"),
		};
	}
	handleLogout = () => {
		console.log("Logging out user!!");
		window.localStorage.clear();
		this.props.userLogout();
	};
	render() {
		return (
			<div>
				<Dropdown>
					<Dropdown.Toggle
						variant="button"
						id="dropdown-basic"
						style={{ color: "black", marginRight: "50px", fontSize: "20px" }}
					>
						<img
							src={icon}
							alt="icon"
							style={{ width: "40px", height: "40px" }}
						/>
						Hi, {this.state.userName}
					</Dropdown.Toggle>
					<Dropdown.Menu id="dropdown-menu-align-right">
						<Dropdown.Item>
							<Link
								to="/Profile"
								className="nav-link"
								style={{ color: "black" }}
							>
								Profile
							</Link>
						</Dropdown.Item>

						<Dropdown.Item>
							<Link
								to="/"
								className="nav-link"
								style={{ color: "black" }}
								onClick={this.handleLogout}
							>
								Log Out
							</Link>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	}
}

export default connect(null, { userLogout })(NavDropDown);
