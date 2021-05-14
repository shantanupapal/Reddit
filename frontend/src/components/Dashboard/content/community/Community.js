import React, { Component } from "react";
import "./Community.css";
// import communties from "../../../../data/communties/communities.json";
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import { backendURI } from "../../../../utils/config";
import axios from "axios";
import { Link } from "react-router-dom";
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

        console.log(communities);
    };
    render() {
        const show_communities = [];
        if (this.state && this.state.communities) {
            console.log(this.state.posts);
            const allcommunities = this.state.communities;
            for (let index = 0; index < allcommunities.length; index++) {
                const communityLink =
                    "/community/" + allcommunities[index].communityName;
                show_communities.push(
                    <>
                        <Link to={communityLink} className="comm-link">
                            <div
                                className="community hoverable"
                                key={allcommunities[index]._id}
                            >
                                <span>{index + 1}</span>
                                <ArrowDropUp />
                                <img src={allcommunities[index].image_src} />
                                <span className="name">
                                    r/{allcommunities[index].communityName}
                                </span>
                            </div>
                        </Link>
                    </>
                );
            }
        }
        return (
            <div className="community-section">
                <div className="title">
                    <span className="hoverable">My Communities</span>
                </div>
                <div className="communities-wrapper">{show_communities}</div>
            </div>
        );
    }
}
