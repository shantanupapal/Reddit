import React, { Component } from "react";
import { backendURI } from "../../../utils/config";
import axios from "axios";
import NavbarMain from "../../Layout/NavbarMain";
import SideBar from "../content/side-bar/SideBar";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

export class Post extends Component {
    state = {
        comments: [],
        post: {},
    };

    componentWillMount = async () => {
        const post_id = localStorage.getItem("post_id");
        // const user_id = "609453c6b6b2ec490cdbc0ce";

        const Post = await axios.get(
            `${backendURI}/dashboard/getpost/${post_id}`
        );

        if (Post.data) {
            console.log(Post);
            const thispost = Post.data;
            this.setState({
                ...this.post,
                post: thispost,
            });
        }
        console.log(this.state.post);
    };

    render() {
        return (
            <>
                <NavbarMain />
                <div className="content">
                    <div className="bars-wrapper">
                        <div className="bars-wrapper-inside">
                            <div className="main-bar">
                                <div className="post-wrapper">
                                    <div className="post">
                                        <div className="post-sidebar">
                                            <ArrowUpwardIcon className="upvote" />
                                            <span>
                                                {this.state.post
                                                    ? this.state.post.votes
                                                    : "loading"}
                                            </span>
                                            <ArrowDownwardIcon className="downvote" />
                                        </div>
                                        <div className="post-title">
                                            <img src="" alt="user_image" />
                                            <span className="subreddit-name">
                                                r/
                                                {this.state.post
                                                    ? this.state.post
                                                          .communityName
                                                    : "loading"}
                                            </span>
                                            <span className="post-user">
                                                Posted by
                                            </span>
                                            <span className="post-user underline">
                                                u/
                                            </span>
                                            <span className="post-user">
                                                on
                                            </span>
                                            <span className="post-user">
                                                {this.state.post
                                                    ? this.state.post.createdAt
                                                    : "loading"}
                                            </span>
                                            <div className="spacer"></div>
                                        </div>
                                        <div className="post-body">
                                            <span className="title">
                                                {this.state.post
                                                    ? this.state.post.title
                                                    : "Loading"}
                                            </span>

                                            {this.state.post &&
                                                this.state.post.image && (
                                                    <img
                                                        src={
                                                            this.state.post &&
                                                            this.state.post
                                                                .image
                                                        }
                                                        alt="Imageinpost"
                                                    />
                                                )}
                                            {this.state.post &&
                                                this.state.post.body && (
                                                    <span className="description">
                                                        {this.state.post &&
                                                            this.state.post
                                                                .body}
                                                    </span>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Post;
