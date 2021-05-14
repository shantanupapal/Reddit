import React from "react";
//import Searchbar from "./Searchbar";
import NavDropDown from "./NavDropDown";
import NavDropDownOne from "./NavDropDownOne";
import logo from "../../images/reddit-logo.svg";
import "../../App.css";
import "./Navbar.css";
const NavbarMain = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<img
					src={logo}
					className="logo"
					alt="logo"
					style={{ width: "150px", float: "left" }}
				/>
				<NavDropDownOne />
				{/* <Searchbar /> */}
				<NavDropDown />
			</div>
		</nav>
	);
};

export default NavbarMain;
