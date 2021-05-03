import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import MessageIcon from "@material-ui/icons/Message";

class NavDropDownOne extends Component {
	render() {
		return (
			<Dropdown>
				<Dropdown.Toggle
					variant="button"
					id="dropdown-basic"
					style={{ color: "black", fontSize: "20px" }}
				>
					<HomeIcon />
					Home
				</Dropdown.Toggle>
				<Dropdown.Menu id="dropdown-menu-align-right">
					<Dropdown.Item>
						<Link to="/Profile" className="nav-link" style={{ color: "black" }}>
							<HomeIcon /> Home
						</Link>
					</Dropdown.Item>

					<Dropdown.Item>
						<Link to="/" className="nav-link" style={{ color: "black" }}>
							<PeopleIcon /> Communities
						</Link>
					</Dropdown.Item>
					<Dropdown.Item>
						<Link to="/" className="nav-link" style={{ color: "black" }}>
							<MessageIcon /> Messages
						</Link>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	}
}

export default NavDropDownOne;
