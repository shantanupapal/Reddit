import React, { Component } from "react";
import NavbarMain from "../Layout/NavbarMain";
import Content from "./content/Content";
// import Navbar from "./navbar/Navbar";
// import Landing from "./landing/Landing";

export class Dashboard extends Component {
    render() {
        return (
            <div>
                <NavbarMain />
                <Content />
            </div>
        );
    }
}

export default Dashboard;
