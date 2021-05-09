import React, { Component } from "react";
import NavbarMain from "../Layout/NavbarMain";
import sidebar from "../../images/community-sidebar.png";
import { NavLink } from "react-router-dom";
import { Route, Switch } from "react-router";

class SinglePost extends Component {
	downvotePost = () => {
		alert("downvote Post");
	};
	upvotePost = () => {
		alert("upvote Post");
	};
	render() {
		console.log(this.props);
		return (
			<div>
				<div className="flex flex-col border p-2 m-2">
					<div className="">
						<span className="text-xl font-semibold">{this.props.post.title} </span>
						<span className="float-right">
							<button className="btn btn-link" onClick={this.upvotePost}>
								upvote
							</button>
							<button className="btn btn-link" onClick={this.downvotePost}>
								downvote
							</button>
							<span className="pl-2">{this.props.post.votes}</span>
						</span>
					</div>
					<div className="">
						<span>{this.props.post.body} </span>
					</div>
					<hr></hr>
					<div className="">
						<div className="text-xs font-extralight">Comments</div>
						{this.props.post.comments &&
							this.props.post.comments.map((comment) => {
								return <Comment comment={comment} />;
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
		alert("Create Post");
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
			<div>
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
							placeholder="New Post Title"
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
						<button className="btn btn-primary" style={{ borderRadius: "25px" }} onClick={this.createPost}>
							Post
						</button>
					</span>
				</div>
				<div className="row">
					<div className="col-lg-12">
						{this.props.posts &&
							this.props.posts.map((post) => {
								return <SinglePost post={post} />;
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
	createPost = () => {
		alert("Create Post");
	};
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
	createPost = () => {
		alert("Create Post");
	};
	render() {
		console.log(this.props);
		return <div className="col-lg-12 border m-2">Users</div>;
	}
}

class Comment extends Component {
	constructor() {
		super();
		this.state = { communityData: {} };
	}
	createPost = () => {
		alert("Create Post");
	};
	render() {
		console.log(this.props);
		return <div className="col-lg-12 border">Comment</div>;
	}
}

class CommunityHome extends Component {
	constructor() {
		super();
		this.state = { communityData: {} };
	}
	componentDidMount = () => {
		this.getCommunityData();
		let communityId = this.props.match.params.id;
		console.log("communityId", communityId);
		const communityData = {
			communityName: "Memes",
			description: "Community for memes",
			images: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
			rules: [{ title: "Rule 1", desc: "Rule 1" }],
			communityMembers: [{ id: 1, name: "PG" }],
			posts: [
				{
					title: "Post1",
					body: "Post 1 body",
					votes: 5,
					link: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
					image: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png",
					comments: [
						{
							content: "Comment 1",
							votes: 4,
							commentedBy: { _id: 1, name: "PG" },
							commentedAt: "5/5/2021",
							nestedComments: {
								content: "Nested Comment 1",
								votes: 2,
								commentedBy: { _id: 1, name: "PG" },
								commentedAt: "6/5/2021",
								nestedComments: {},
							},
						},
					],
					createdBy: { _id: 1, name: "PG" },
					createdAt: "6/5/2021",
				},
			],
			topics: ["Memes", "Meme"],
			votes: 5,
			createdBy: { _id: 1, name: "PG" },
			createdAt: "6/5/2021",
		};
		this.setState({
			communityData: communityData,
		});
	};
	getCommunityData = () => {
		this.setState({
			posts: ["Sameple Post A", "Sample Post B"],
		});
	};

	joinCommunity = () => {
		alert("Join Community");
	};
	render() {
		let communityId = this.props.match.params.id;
		let communityLink = "/community/" + communityId;
		let rulesLink = "/community/" + communityId + "/rules";
		let usersLink = "/community/" + communityId + "/users";
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
									<button
										className="btn btn-primary"
										style={{ borderRadius: "25px" }}
										onClick={this.joinCommunity}
									>
										Join
									</button>
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
									path="/community/:id"
									component={(props) => <Posts posts={this.state.communityData.posts} {...props} />}
								/>
								<Route
									path="/community/:id/rules"
									component={(props) => <Rules rules={this.state.communityData.rules} {...props} />}
								/>
								<Route
									path="/community/:id/users"
									component={(props) => (
										<Users users={this.state.communityData.communityMembers} {...props} />
									)}
								/>
							</Switch>

							{/* {this.state.posts &&
								this.state.communityData.posts.map((post) => {
									return <Post post={post} />;
								})} */}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CommunityHome;
