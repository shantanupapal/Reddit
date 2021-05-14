import React, { Component } from "react";
import "./Posts.css";
// import posts from "../../../../data/posts/posts.json";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import user_image from "./subreddit.jpg";
import { backendURI } from "../../../../utils/config";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export class Posts extends Component {
    state = {
        posts: [],
        asc: false,
        showPopUp: false,
        comments: [],
    };

    handleClose = () => {
        this.setState({ showPopUp: false });
    };

    handleShow = (id) => {
        let comments = [];
        console.log(id);
        console.log(this.state.posts);
        const posts = this.state.posts;
        posts.forEach((post) => {
            if (post._id === id) {
                comments.push(post.comments);
            }
        });
        this.setState({ comments: comments });
        console.log(comments);
        this.setState({ showPopUp: true });
    };

    componentWillMount = async () => {
        const user_id = localStorage.getItem("userid");
        // const user_id = "609453c6b6b2ec490cdbc0ce";

        const Posts = await axios.get(
            `${backendURI}/dashboard/getallposts/${user_id}`
        );

        const allposts = [];

        if (Posts.data) {
            Posts.data.forEach((post) => {
                console.log(post.communityName);
                post.posts.forEach((item) => {
                    item.communityName = post.communityName;
                    item.community_id = post._id;
                    allposts.push(item);
                });
            });
        }

        this.setState({
            ...this.posts,
            posts: allposts,
        });
    };

    sortByVotes = () => {
        const posts = this.state.posts;
        this.setState({ asc: !this.state.asc });
        if (this.state.asc === false) {
            posts.sort((a, b) => {
                if (a.votes > b.votes) {
                    return -1;
                }
                if (a.votes < b.votes) {
                    return 1;
                }
                return 0;
            });
            this.setState({
                ...this.posts,
                posts: posts,
            });
        } else {
            posts.sort((a, b) => {
                if (a.votes < b.votes) {
                    return -1;
                }
                if (a.votes > b.votes) {
                    return 1;
                }
                return 0;
            });
            this.setState({
                ...this.posts,
                posts: posts,
            });
        }
    };

    sortByDate = () => {
        this.setState({ asc: !this.state.asc });
        let date = this.state.posts;
        if (this.state.asc === false) {
            date.sort((a, b) => {
                if (a.createdAt > b.createdAt) {
                    return -1;
                }
                if (a.createdAt < b.createdAt) {
                    return 1;
                }
                return 0;
            });
            this.setState({
                ...this.posts,
                posts: date,
            });
        } else {
            date.sort((a, b) => {
                if (a.createdAt < b.createdAt) {
                    return -1;
                }
                if (a.createdAt > b.createdAt) {
                    return 1;
                }
                return 0;
            });
            this.setState({
                ...this.posts,
                posts: date,
            });
        }
    };

    sortByComments = () => {
        this.setState({ asc: !this.state.asc });
        let comments = this.state.posts;
        if (this.state.asc === false) {
            comments.sort((a, b) => {
                if (a.comments > b.comments) {
                    return -1;
                }
                if (a.comments < b.comments) {
                    return 1;
                }
                return 0;
            });
            this.setState({
                ...this.posts,
                posts: comments,
            });
        } else {
            comments.sort((a, b) => {
                if (a.comments < b.comments) {
                    return -1;
                }
                if (a.comments > b.comments) {
                    return 1;
                }
                return 0;
            });
            this.setState({
                ...this.posts,
                posts: comments,
            });
        }
    };

    render() {
        let comments = "loading";
        if (this.state && this.state.comments.length) {
            comments = this.state.comments.map((comment) => {
                <div key={comment._id}>{comment.content}</div>;
            });
        }

        const posts = [];
        if (this.state && this.state.posts) {
            const allposts = this.state.posts;
            for (let index = 0; index < allposts.length; index++) {
                const post_id = allposts[index]._id;
                const linktopost = "/Post/" + post_id;
                posts.push(
                    <div className="post">
                        <div className="post-sidebar">
                            <ArrowUpwardIcon className="upvote" />
                            <span>{allposts[index].votes}</span>
                            <ArrowDownwardIcon className="downvote" />
                        </div>
                        <div className="post-title">
                            <img src={user_image} alt="user_image" />
                            <span className="subreddit-name">
                                r/{allposts[index].communityName}
                            </span>
                            <span className="post-user">Posted by</span>
                            <span className="post-user underline">
                                u/{allposts[index].createdBy.userName + " "}
                            </span>
                            <span className="post-user">on</span>
                            <span className="post-user">
                                {allposts[index].createdAt.split("T")[0]}
                            </span>
                            <div className="spacer"></div>
                        </div>
                        <div className="post-body">
                            <span className="title">
                                {allposts[index].title}
                            </span>

                            {allposts[index].image && (
                                <img
                                    src={allposts[index].image}
                                    alt="Imageinpost"
                                />
                            )}
                            {allposts[index].body && (
                                <span className="description">
                                    {allposts[index].body}
                                </span>
                            )}
                        </div>
                        <Link
                            to={linktopost}
                            onClick={() => {
                                localStorage.setItem("post_id", post_id);
                            }}
                        >
                            <div className="post-footer">
                                <div
                                    className="comments footer-action"
                                    onClick={() => {
                                        this.handleShow(allposts[index]._id);
                                    }}
                                >
                                    <ModeCommentIcon className="comment-icon" />
                                    <span>
                                        {allposts[index].comments.length}{" "}
                                        Comments
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            }
        }
        return (
            <>
                <div className="main-bar">
                    <div className="filter-container">
                        <div className="filter-element hoverable">
                            <span>Sort By:</span>
                        </div>
                        <div
                            className="filter-element hoverable"
                            onClick={() => {
                                this.sortByVotes();
                            }}
                        >
                            <span className="db-sort-types">Most Upvotes</span>
                        </div>
                        <div
                            className="filter-element hoverable "
                            onClick={() => {
                                this.sortByComments();
                            }}
                        >
                            <span className="db-sort-types">Most Comments</span>
                        </div>
                        <div
                            className="filter-element hoverable"
                            onClick={() => {
                                this.sortByDate();
                            }}
                        >
                            <span className="db-sort-types">Created at</span>
                        </div>
                    </div>

                    <div className="posts-wrapper">{posts}</div>

                    <Modal
                        centered
                        size="sm"
                        show={this.state.showPopUp}
                        onHide={this.handleClose}
                    >
                        <Modal.Header
                            // closeButton
                            className="modalHeader"
                        >
                            <Modal.Title>Comments</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>COMMENTS WILL BE HERE</div>
                        </Modal.Body>
                    </Modal>
                </div>
            </>
        );
    }
}

export default Posts;
