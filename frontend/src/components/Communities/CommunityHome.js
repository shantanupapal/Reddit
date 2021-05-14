import React, { Component } from "react";
import NavbarMain from "../Layout/NavbarMain";
import sidebar from "../../images/community-sidebar.png";
import { NavLink } from "react-router-dom";
import { Route, Switch } from "react-router";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { backendURI } from "../../utils/config";
import axios from "axios";

class SinglePost extends Component {
	constructor() {
		super();
		this.state = { comment: "", showReplyToPostModal: false };
	}
	downvotePost = () => {
		let communityName = this.props.match.params.name;
		let communityId = localStorage.getItem("communityid");
		let user_id = localStorage.getItem("userid");
		axios
			.post(`${backendURI}/api/communityhome1/vote/`, {
				community_id: communityId,
				user_id: user_id,
				downvote: true,
				upvote: false,
				comment_id: null,
				post_id: this.props.post._id,
			})
			.then((response) => {
				// this.props.history.push("/community/" + communityName);
				this.props.getCommunityData();
				console.log("Actions::response from vote", response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	upvotePost = () => {
		let communityName = this.props.match.params.name;
		let communityId = localStorage.getItem("communityid");
		let user_id = localStorage.getItem("userid");
		axios
			.post(`${backendURI}/api/communityhome1/vote/`, {
				community_id: communityId,
				user_id: user_id,
				downvote: false,
				upvote: true,
				comment_id: null,
				post_id: this.props.post._id,
			})
			.then((response) => {
				// this.props.history.push("/community/" + communityName);
				this.props.getCommunityData();
				console.log("Actions::response from vote", response.data);
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
	commentOnPost = () => {
		let communityName = this.props.match.params.name;
		let communityId = localStorage.getItem("communityid");
		let user_id = localStorage.getItem("userid");
		axios
			.post(`${backendURI}/api/communityhome1/add_comment/`, {
				community_id: communityId,
				user_id: user_id,
				post_id: this.props.post._id,
				comment_id: null,
				content: this.state.comment,
			})
			.then((response) => {
				// this.props.history.push("/community/" + communityName);
				this.props.getCommunityData();
				console.log("Actions::response from add comment on post", response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		this.setState({ showReplyToPostModal: false });
	};
	render() {
		console.log(this.props);
		return (
			<div>
				<Modal
					show={this.state.showReplyToPostModal}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">Reply To Post</Modal.Title>
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
				<div className="flex flex-col border p-2 m-2">
					<div className="">
						<span className="text-xl font-semibold">{this.props.post.title} </span>
						<span className="float-right">
							{this.props.checkCommunityUserStatus() === 1 ? (
								<button className="btn btn-link" onClick={this.replyToPost}>
									Reply
								</button>
							) : null}

							<button className="btn btn-link" onClick={this.upvotePost}>
								Upvote
							</button>
							<button className="btn btn-link" onClick={this.downvotePost}>
								Downvote
							</button>
							<span className="pl-2">{this.props.post.votes}</span>
						</span>
					</div>
					<div className="">
						<span className="text-xs font-extralight">
							<b>CreatedBy</b>- {this.props.post.createdBy.userName}
						</span>
						<span className="text-xs font-extralight">At {this.props.post.createdAt}</span>
					</div>
					<div className="border-bottom pb-2">
						<span>{this.props.post.body} </span>
					</div>
					<div className="pt-2">
						<div className="text-xs font-extralight">Comments</div>
						{this.props.post.comments &&
							this.props.post.comments.map((comment) => {
								return (
									<Comment
										getCommunityData={this.props.getCommunityData}
										key={comment._id}
										checkCommunityUserStatus={this.props.checkCommunityUserStatus}
										comment={comment}
										nestedComment={false}
										{...this.props}
									/>
								);
							})}
					</div>
				</div>
			</div>
		);
	}
}

class Posts extends Component {
	constructor() {
		super();
		this.state = { postTitle: null, postBody: null, postLink: null, postImage: null };
	}
	createPost = () => {
		let communityName = this.props.match.params.name;
		let communityId = localStorage.getItem("communityid");
		let user_id = localStorage.getItem("userid");
		let formData = new FormData();
		if (this.state.postImage !== null) {
			formData.append("file", this.state.postImage);
		}
		formData.append("community_id", communityId);
		formData.append("user_id", user_id);
		formData.append("title", this.state.postTitle);
		formData.append("body", this.state.postBody);
		formData.append("link", this.state.postLink);

		axios
			.post(`${backendURI}/api/communityhome1/add_post/`, {
				community_id: communityId,
				user_id: user_id,
				title: this.state.postTitle,
				body: this.state.postBody,
				link: this.state.postLink,
			})
			.then((response) => {
				this.props.getCommunityData();
				// this.props.history.push("/community/" + communityName);
				// let photoData = new FormData();
				// photoData.append("file", this.state.postImage);
				// axios
				// 	.post(`${backendURI}/api/communityhome1/add_photo_to_post/`, photoData)
				// 	.then((response) => {
				// 		console.log("Status Code : ", response.status);
				// 		console.log("resp: ", response);
				// 	})
				// 	.catch((error) => {
				// 		console.log(error);
				// 	});
				// console.log("Actions::response from join community", response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	changePostTitle = (e) => {
		this.setState({ postTitle: e.target.value });
	};
	changePostBody = (e) => {
		this.setState({ postBody: e.target.value });
	};
	changePostLink = (e) => {
		this.setState({ postLink: e.target.value });
	};
	onFileChangeHandler = (e) => {
		this.setState({ postImage: e.target.files[0] });
	};
	render() {
		console.log(this.props);
		return (
			<div className="">
				{this.props.checkCommunityUserStatus() === 1 ? (
					<div className="col-lg-12 border m-2 pt-2 pb-4">
						<span>
							<input
								name="postTitle"
								id="postTitle"
								type="text"
								placeholder="New Post Title"
								className="form-control my-3 p-4"
								required
								onChange={this.changePostTitle}
							/>
							<input
								name="postBody"
								id="postBody"
								type="text"
								placeholder="New Post Body"
								className="form-control my-3 p-4"
								required
								onChange={this.changePostBody}
							/>
							<input
								name="link"
								id="link"
								type="text"
								placeholder="External Link"
								className="form-control my-3 p-4"
								onChange={this.changePostLink}
							/>
							<input type="file" name="file" onChange={this.onFileChangeHandler} placeholder="Image" />
						</span>
						<span className="float-right">
							<button
								className="btn btn-primary"
								style={{ borderRadius: "25px" }}
								onClick={this.createPost}
							>
								Post
							</button>
						</span>
					</div>
				) : null}

				<div className="row">
					<div className="col-lg-12">
						{this.props.posts &&
							this.props.posts.map((post) => {
								return (
									<SinglePost
										getCommunityData={this.props.getCommunityData}
										key={post._id}
										checkCommunityUserStatus={this.props.checkCommunityUserStatus}
										post={post}
										{...this.props}
									/>
								);
							})}
					</div>
				</div>
			</div>
		);
	}
}

class Rules extends Component {
	constructor() {
		super();
		this.state = { communityData: {} };
	}
	render() {
		console.log(this.props);
		return (
			<div className="m-2">
				{this.props.rules &&
					this.props.rules.map((rule) => {
						return (
							<div className="border p-2">
								<li>
									{rule.title} - {rule.desc}
								</li>
							</div>
						);
					})}
			</div>
		);
	}
}
class Users extends Component {
	constructor() {
		super();
		this.state = { communityData: {} };
	}

	render() {
		console.log(this.props);
		return (
			<div className="m-2">
				{this.props.users &&
					this.props.users.map((user) => {
						return (
							<div key={user._id._id} className="border p-2">
								<li>
									{user._id.userName} - {user._id.email}
								</li>
							</div>
						);
					})}
			</div>
		);
	}
}

class Comment extends Component {
	constructor() {
		super();
		this.state = { showModal: false, comment: "" };
	}
	upvoteComment = () => {
		let communityName = this.props.match.params.name;
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
				this.props.getCommunityData();
				console.log("Actions::response from vote", response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	downvoteComment = () => {
		let communityName = this.props.match.params.name;
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
				this.props.getCommunityData();
				console.log("Actions::response from vote", response.data);
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
		let communityName = this.props.match.params.name;
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
				// this.props.history.push("/community/" + communityName);
				this.props.getCommunityData();
				console.log("Actions::response from add comment on post", response.data);
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
				<Modal show={this.state.showModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">Reply To Comment</Modal.Title>
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
							{this.props.checkCommunityUserStatus() === 1 ? (
								<button className="btn btn-link" onClick={this.replyToComment}>
									Reply
								</button>
							) : null}

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
						<span className="text-xs font-extralight">At {this.props.comment.commentedAt}</span>
					</div>
				</li>
				{this.props.comment.nestedComments &&
					this.props.comment.nestedComments.map((nestedComment) => {
						return (
							<Comment
								key={nestedComment._id}
								checkCommunityUserStatus={this.props.checkCommunityUserStatus}
								comment={nestedComment}
								nestedComment={true}
							/>
						);
					})}
			</div>
		);
	}
}

class CommunityHome extends Component {
	constructor() {
		super();
		this.state = { communityData: {} };
	}
	componentDidMount = () => {
		this.getCommunityData();
	};
	getCommunityData = () => {
		let communityName = this.props.match.params.name;
		axios
			.get(`${backendURI}/api/communityhome/getCommunity/${communityName}`)
			.then((response) => {
				this.setState({
					communityData: response.data[0],
				});
				console.log("Actions::response from getCommunity", response.data);
				localStorage.setItem("communityid", response.data[0]._id);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	checkCommunityUserStatus = () => {
		// return 1;
		let acceptStatus = null;
		let loggedInUserId = localStorage.getItem("userid");
		if (this.state.communityData.communityMembers) {
			this.state.communityData.communityMembers.map((member) => {
				if (member._id._id === loggedInUserId) {
					acceptStatus = member.acceptStatus;
				}
			});
		}
		return acceptStatus;
	};

	joinCommunity = () => {
		let communityName = this.props.match.params.name;
		let communityId = localStorage.getItem("communityid");
		let user_id = localStorage.getItem("userid");
		axios
			.post(`${backendURI}/api/communityhome1/join_leave/`, {
				community_id: communityId,
				user_id: user_id,
				acceptStatus: 0,
			})
			.then((response) => {
				// this.props.history.push("/community/" + communityName);
				console.log("join community");
				this.getCommunityData();
				console.log("Actions::response from join community", response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	leaveCommunity = () => {
		let communityName = this.props.match.params.name;
		let communityId = localStorage.getItem("communityid");
		let user_id = localStorage.getItem("userid");
		axios
			.post(`${backendURI}/api/communityhome1/join_leave/`, {
				communityId: communityId,
				user_id: user_id,
				acceptStatus: 3,
			})
			.then((response) => {
				// this.props.history.push("/community/" + communityName);
				console.log("leave community");
				this.getCommunityData();
				console.log("Actions::response from join community", response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	render() {
		let communityName = this.props.match.params.name;
		let communityLink = "/community/" + communityName;
		let rulesLink = "/community/" + communityName + "/rules";
		let usersLink = "/community/" + communityName + "/users";
		return (
			<div className="container-fluid">
				<NavbarMain />
				<div className="container">
					<div className="row">
						<div className="col-lg-2">
							<img src={sidebar} alt="sidebar" className="img-fluid" />
						</div>
						<div className="col-lg-10 pt-5">
							<div className="flex justify-between">
								<div className="text-3xl">{this.state.communityData.communityName}</div>
								<div className="float-right">
									{this.checkCommunityUserStatus() === null ||
									this.checkCommunityUserStatus() === 3 ? (
										<Button onClick={this.joinCommunity} variant="success">
											Join
										</Button>
									) : null}
									{this.checkCommunityUserStatus() === 1 ? (
										<Button onClick={this.leaveCommunity} variant="danger">
											Leave
										</Button>
									) : null}
									{this.checkCommunityUserStatus() === 0 ? (
										<Button disabled variant="warning">
											Pending
										</Button>
									) : null}
									{this.checkCommunityUserStatus() === 2 ? (
										<Button disabled variant="danger">
											Rejected
										</Button>
									) : null}
								</div>
							</div>
							<div className="font-extralight text-lg">{this.state.communityData.description}</div>

							<div className="row">
								<div className="col-lg-12">
									<div className="flex ">
										<div className="py-2 pr-2 text-center">
											<NavLink
												activeStyle={{
													fontWeight: "bold",
													color: "teal",
												}}
												exact={true}
												to={communityLink}
											>
												Dashboard
											</NavLink>
										</div>
										<div className="p-2 text-center">
											<NavLink
												activeStyle={{
													fontWeight: "bold",
													color: "teal",
												}}
												exact={true}
												to={rulesLink}
											>
												Rules
											</NavLink>
										</div>
										<div className="p-2 text-center">
											<NavLink
												activeStyle={{
													fontWeight: "bold",
													color: "teal",
												}}
												exact={true}
												to={usersLink}
											>
												Users
											</NavLink>
										</div>
									</div>
								</div>
							</div>

							<hr></hr>
							<Switch>
								<Route
									exact={true}
									path="/community/:name"
									component={(props) => (
										<Posts
											getCommunityData={this.getCommunityData}
											checkCommunityUserStatus={this.checkCommunityUserStatus}
											posts={this.state.communityData.posts}
											{...props}
										/>
									)}
								/>
								<Route
									path="/community/:name/rules"
									component={(props) => <Rules rules={this.state.communityData.rules} {...props} />}
								/>
								<Route
									path="/community/:name/users"
									component={(props) => (
										<Users users={this.state.communityData.communityMembers} {...props} />
									)}
								/>
							</Switch>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CommunityHome;
