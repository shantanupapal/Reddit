import React, { Component } from "react";
import "./Community.css";
import communties from "../../../../data/communties/communities.json";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import { backendURI } from "../../../../utils/config";
import axios from "axios";
export default class Community extends Component {
    state = {
        communities: [],
    };
    componentWillMount = async () => {
        const user_id = localStorage.getItem("userid");

        const { data: communities } = await axios.get(
            `${backendURI}/dashboard/getallposts/${user_id}`
        );

        if (communities) {
            this.setState({
                communities: communities,
            });
        }
    };
    render() {
        return (
            <div className="community-section">
                <div className="title">
                    <span className="hoverable">My Communities</span>
                </div>
                <div className="communities-wrapper">
                    {this.state &&
                        this.state.communities.map((community, index) => (
                            <div
                                className="community hoverable"
                                key={community._id}
                            >
                                <span>{index + 1}</span>
                                <ArrowDropUp />
                                <img src={community.image_src} />
                                <span className="name">
                                    r/{community.communityName}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}
