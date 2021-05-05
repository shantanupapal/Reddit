import React, { Component } from "react";
import NavbarMain from "../Layout/NavbarMain";
import sidebar from "../../images/community-sidebar.png";

class Post extends Component {
	downvotePost = () => {
		alert("downvote Post");
	};
	upvotePost = () => {
		alert("upvote Post");
	};
	render() {
		console.log(this.props);
		return (
			<div className="col-lg-12 p-2 border m-2">
				<span>{this.props.post}</span>
				<span className="float-right">
					<button className="btn btn-link" onClick={this.upvotePost}>
						upvote
					</button>
					<button className="btn btn-link" onClick={this.downvotePost}>
						downvote
					</button>
					<span className="pl-2">5</span>
				</span>
			</div>
		);
	}
}
class CommunityHome extends Component {
	constructor() {
		super();
		this.state = {};
	}
	componentDidMount = () => {
		this.getCommunityData();
	};
	getCommunityData = () => {
		this.setState({
			posts: ["Sameple Post A", "Sample Post B"],
		});
	};
	createPost = () => {
		alert("Create Post");
	};
	joinCommunity = () => {
		alert("Join Community");
	};
	render() {
		return (
			<div className="container-fluid">
				<NavbarMain />
				<div className="container">
					<div className="row">
						<div className="col-lg-2">
							<img src={sidebar} alt="sidebar" className="img-fluid" />
						</div>
						<div className="col-lg-10 pt-5">
							<h3>
								Memes
								<button
									className="btn btn-primary btn-lg float-right"
									style={{ borderRadius: "25px" }}
									onClick={this.joinCommunity}
								>
									Join
								</button>
							</h3>
							<hr></hr>
							<div className="col-lg-12 border m-2">
								<input
									name="name"
									id="name"
									type="text"
									placeholder="New Post"
									className="form-control my-3 p-4"
									required
								/>
								<button
									className="btn btn-primary"
									style={{ borderRadius: "25px" }}
									onClick={this.createPost}
								>
									Post
								</button>
							</div>
							{this.state.posts &&
								this.state.posts.map((post) => {
									return <Post post={post} />;
								})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CommunityHome;
