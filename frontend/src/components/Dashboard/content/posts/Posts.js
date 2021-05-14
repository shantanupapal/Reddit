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
	};

	sortByVotes = () => {
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
						<div className="filter-element hoverable">
							<span className="db-sort-types">Most Comments</span>
						</div>
						<div className="filter-element hoverable">
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
									<span className="subreddit-name">r/{post.name}</span>
									<span className="post-user">Posted by</span>
									<span className="post-user underline">u/{post.createdBy}</span>
									<div className="spacer"></div>
								</div>
								<div className="post-body">
									<span className="title">{post.title}</span>

									{post.image_src && <img src={post.image_src} alt="Imageinpost" />}
									{post.body && <span className="description">{post.body}</span>}
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
