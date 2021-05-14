import React, { Component } from "react";
import "./MainBar.css";
import Posts from "../posts/Posts";

export default class MainBar extends Component {
    componentWillMount = () => {};

    render() {
        return (
            <>
                <Posts />
            </>
        );
    }
}
