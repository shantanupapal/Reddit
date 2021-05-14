import React, { Component } from "react";
import "./Posts.css";
import posts from "../../../../data/posts/posts.json";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import user_image from "./subreddit.jpg";

export class Posts extends Component {
    state = {
        posts: posts,
        asc: false,
    };

    componentWillReceiveProps = () => {};

    sortByVotes = () => {
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
                ...posts,
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
                ...posts,
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
                ...posts,
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
                ...posts,
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
                ...posts,
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
                ...posts,
                posts: comments,
            });
        }
    };

    render() {
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

                    <div className="posts-wrapper">
                        {this.state.posts.map((post, index) => (
                            <div className="post">
                                <div className="post-sidebar">
                                    <ArrowUpwardIcon className="upvote" />
                                    <span>{post.votes}</span>
                                    <ArrowDownwardIcon className="downvote" />
                                </div>
                                <div className="post-title">
                                    <img src={user_image} alt="user_image" />
                                    <span className="subreddit-name">
                                        r/{post.name}
                                    </span>
                                    <span className="post-user">Posted by</span>
                                    <span className="post-user underline">
                                        u/{post.createdBy}
                                    </span>
                                    <div className="spacer"></div>
                                </div>
                                <div className="post-body">
                                    <span className="title">{post.title}</span>

                                    {post.image_src && (
                                        <img
                                            src={post.image_src}
                                            alt="Imageinpost"
                                        />
                                    )}
                                    {post.body && (
                                        <span className="description">
                                            {post.body}
                                        </span>
                                    )}
                                </div>
                                <div className="post-footer">
                                    <div className="comments footer-action">
                                        <ModeCommentIcon className="comment-icon" />
                                        <span>{post.comments} Comments</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

export default Posts;
