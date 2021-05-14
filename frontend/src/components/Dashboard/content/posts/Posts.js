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

class Comment extends Component {
	constructor() {
		super();
		this.state = { showModal: false, comment: "" };
	}
	upvoteComment = () => {
		// let communityName = this.props.match.params.name;
		let communityId = localStorage.getItem("communityid");
		let user_id = localStorage.getItem("userid");
		axios
			.post(`${backendURI}/api/communityhome1/vote/`, {
				community_id: communityId,
				user_id: user_id,
				downvote: false,
				upvote: true,
				comment_id: this.props.comment._id,
				post_id: null,
			})
			.then((response) => {
				// this.props.history.push("/community/" + communityName);
				this.props.getPosts();
				// window.reload();
				// console.log("Actions::response from vote", response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	downvoteComment = () => {
		// let communityName = this.props.match.params.name;
		let communityId = localStorage.getItem("communityid");
		let user_id = localStorage.getItem("userid");
		axios
			.post(`${backendURI}/api/communityhome1/vote/`, {
				community_id: communityId,
				user_id: user_id,
				downvote: true,
				upvote: false,
				comment_id: this.props.comment._id,
				post_id: null,
			})
			.then((response) => {
				// this.props.history.push("/community/" + communityName);
				this.props.getPosts();
				// window.reload();
				// console.log("Actions::response from vote", response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	replyToComment = () => {
		this.setState({ showModal: true });
	};
	closeModal = () => {
		this.setState({ showModal: false });
	};
	changeComment = (e) => {
		this.setState({ comment: e.target.value });
	};
	submitComment = () => {
		// let communityName = this.props.match.params.name;
		let communityId = localStorage.getItem("communityid");
		let user_id = localStorage.getItem("userid");
		axios
			.post(`${backendURI}/api/communityhome1/add_comment/`, {
				community_id: communityId,
				user_id: user_id,
				post_id: null,
				comment_id: this.props.comment._id,
				content: this.state.comment,
			})
			.then((response) => {
				this.props.getPosts();
			})
			.catch((error) => {
				console.log(error);
			});
		this.setState({ showModal: false });
	};
	render() {
		console.log(this.props);
		if (!this.props.comment.content) {
			return null;
		}
		return (
			<div className="py-2">
				<Modal
					show={this.state.showModal}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">
							Reply To Comment
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h4>Add Comment</h4>
						<input
							name="addCommentToComment"
							id="addCommentToComment"
							type="text"
							placeholder="Reply"
							className="form-control my-3 p-4"
							required
							onChange={this.changeComment}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.closeModal}>Close</Button>
						<Button variant="success" onClick={this.submitComment}>
							Comment
						</Button>
					</Modal.Footer>
				</Modal>
				<li>
					{this.props.nestedComment === false ? (
						<span>{this.props.comment.content}</span>
					) : (
						<span>&emsp;{this.props.comment.content}</span>
					)}
					{this.props.nestedComment === false ? (
						<span className="float-right">
							<button className="btn btn-link" onClick={this.replyToComment}>
								Reply
							</button>

							<button className="btn btn-link" onClick={this.upvoteComment}>
								Upvote
							</button>
							<button className="btn btn-link" onClick={this.downvoteComment}>
								Downvote
							</button>
							<span className="pl-2">{this.props.comment.votes}</span>
						</span>
					) : null}
					<div className="">
						<span className="text-xs font-extralight">
							<b>CreatedBy</b>- {this.props.comment.commentedBy.userName}
						</span>
						<span className="text-xs font-extralight">
							At {this.props.comment.commentedAt}
						</span>
					</div>
				</li>
				{this.props.comment.nestedComments &&
					this.props.comment.nestedComments.map((nestedComment) => {
						return (
							<Comment
								key={nestedComment._id}
								comment={nestedComment}
								nestedComment={true}
							/>
						);
					})}
			</div>
		);
	}
}
export class Posts extends Component {
	state = {
		posts: [],
		asc: false,
		showPopUp: false,
		comments: [],
		showReplyToPostModal: false,
	};

	handleClose = () => {
		this.setState({ showPopUp: false });
	};

	handleShow = (id) => {
		let comments = [];
		// console.log(id);
		// console.log(this.state.posts);
		const posts = this.state.posts;
		posts.forEach((post) => {
			if (post._id === id) {
				comments.push(post.comments);
			}
		});
		this.setState({ comments: comments });
		// console.log(comments);
		this.setState({ showPopUp: true });
	};

	getPosts = async () => {
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
	componentDidMount() {
		this.getPosts();
	}

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

	downvotePost = (post_id) => {
		// e.preventDefault();
		// let communityName = this.props.match.params.name;
		let communityId = localStorage.getItem("communityid");
		let user_id = localStorage.getItem("userid");
		axios
			.post(`${backendURI}/api/communityhome1/vote/`, {
				community_id: communityId,
				user_id: user_id,
				downvote: true,
				upvote: false,
				comment_id: null,
				post_id: post_id,
			})
			.then((response) => {
				this.getPosts();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	upvotePost = (post_id) => {
		// e.preventDefault();
		// let communityName = this.props.match.params.name;
		let communityId = localStorage.getItem("communityid");
		let user_id = localStorage.getItem("userid");
		axios
			.post(`${backendURI}/api/communityhome1/vote/`, {
				community_id: communityId,
				user_id: user_id,
				downvote: false,
				upvote: true,
				comment_id: null,
				post_id: post_id,
			})
			.then((response) => {
				this.getPosts();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	replyToPost = () => {
		this.setState({ showReplyToPostModal: true });
	};
	closeReplyToPostModal = () => {
		this.setState({ showReplyToPostModal: false });
	};
	changePostComment = (e) => {
		this.setState({ comment: e.target.value });
	};
	commentOnPost = (e) => {
		e.preventDefault();
		// let communityName = this.props.match.params.name;
		let communityId = localStorage.getItem("communityid");
		let user_id = localStorage.getItem("userid");
		let post_id = localStorage.getItem("postid");
		console.log("post_id");
		axios
			.post(`${backendURI}/api/communityhome1/add_comment/`, {
				community_id: communityId,
				user_id: user_id,
				post_id: post_id,
				comment_id: null,
				content: this.state.comment,
			})
			.then((response) => {
				this.getPosts();
			})
			.catch((error) => {
				console.log(error);
			});
		this.setState({ showReplyToPostModal: false });
	};
	render() {
		const posts = [];
		if (this.state && this.state.posts && this.state.posts.length > 0) {
			console.log(this.state.posts);
			const allposts = this.state.posts;
			for (let index = 0; index < allposts.length; index++) {
				const post_id = allposts[index]._id;
				const communityLink = "/community/" + allposts[index].communityName;
				const userLink = "/ViewProfile/" + allposts[index].createdBy._id;
				let postImage = null;
				if (allposts[index].image) {
					postImage = backendURI + "/images/" + allposts[index].image;
				}
				posts.push(
					<>
						<Modal
							show={this.state.showReplyToPostModal}
							size="lg"
							aria-labelledby="contained-modal-title-vcenter"
							centered
						>
							<Modal.Header closeButton>
								<Modal.Title id="contained-modal-title-vcenter">
									Reply To Post
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<h4>Add Comment</h4>
								<input
									name="addCommentToPost"
									id="addCommentToPost"
									type="text"
									placeholder="Reply"
									className="form-control my-3 p-4"
									required
									onChange={this.changePostComment}
								/>
							</Modal.Body>
							<Modal.Footer>
								<Button onClick={this.closeReplyToPostModal}>Close</Button>
								<Button variant="success" onClick={this.commentOnPost}>
									Comment
								</Button>
							</Modal.Footer>
						</Modal>
						<div className="post" key={post_id}>
							<div className="post-sidebar">
								<ArrowUpwardIcon
									className="upvote"
									onClick={() => {
										this.upvotePost(post_id);
									}}
								/>
								<span>{allposts[index].votes}</span>
								<ArrowDownwardIcon
									className="downvote"
									onClick={() => {
										this.downvotePost(post_id);
									}}
								/>
							</div>
							<div className="post-title">
								<img src={user_image} alt="user_image" />
								<Link to={communityLink} className="comm-link">
									<span className="subreddit-name">
										r/{allposts[index].communityName}
									</span>
								</Link>

								<span className="post-user">Posted by</span>
								<Link to={userLink} className="comm-link">
									<span className="post-user underline">
										u/
										{allposts[index].createdBy.userName + " "}
									</span>
								</Link>

								<span className="post-user">on</span>
								<span className="post-user">
									{allposts[index].createdAt.split("T")[0]}
								</span>
								<div className="spacer"></div>
							</div>
							<div className="post-body">
								<span className="title">{allposts[index].title}</span>

								{postImage && <img src={postImage} alt="Imageinpost" />}
								{allposts[index].body && (
									<span className="description">{allposts[index].body}</span>
								)}
							</div>
							<div>
								<div className="post-footer">
									<div
										className="comments footer-action"
										onClick={() => {
											this.handleShow(allposts[index]._id);
										}}
									>
										<ModeCommentIcon className="comment-icon" />
										<div>{allposts[index].comments.length} Comments</div>
										<div
											onClick={() => {
												localStorage.setItem("postid", post_id);
												this.replyToPost();
											}}
										>
											+
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="comments">
							<div>
								{allposts[index].comments &&
									allposts[index].comments.map((comment) => {
										return (
											<Comment
												key={comment._id}
												comment={comment}
												nestedComment={false}
												getPosts={this.getPosts}
												{...this.props}
											/>
										);
									})}
							</div>
						</div>
					</>
				);
			}
		} else {
			posts.push(<h2 className="text-secondary">No Posts Available</h2>);
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
				</div>
			</>
		);
	}
}

export default Posts;
