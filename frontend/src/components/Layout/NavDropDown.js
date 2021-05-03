import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
//import PersonIcon from "@material-ui/icons/Person";
import icon from "../../images/reddit-icon.png";

class NavDropDown extends Component {
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
						Username
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
							<Link to="/" className="nav-link" style={{ color: "black" }}>
								Log Out
							</Link>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>
		);
	}
}

export default NavDropDown;
