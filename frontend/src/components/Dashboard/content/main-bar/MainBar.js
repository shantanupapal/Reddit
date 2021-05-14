import React, { Component } from "react";
import "./MainBar.css";
import Posts from "../posts/Posts";
import { backendURI } from "../../../../utils/config";
import axios from "axios";
export default class MainBar extends Component {
    render() {
        return (
            <>
                <Posts />
            </>
        );
    }
}
