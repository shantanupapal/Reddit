"use strict";
import "./allCommunities.css";
import React, { Component } from "react";
import NavbarMain from "../../Layout/NavbarMain";
import { Redirect } from "react-router";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import person from "../../../images/person.svg";
import post from "../../../images/post.svg";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { backendURI } from "../../../utils/config";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import "../../Layout/searchbar.css";
import { getAllCommunities } from "../../../redux/actions/communitySearchActions";

class AllCommunities extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: "",
			allCommunities: [],
			userId: localStorage.getItem("userid"),
			currentPage: 1,
			itemsPerPage: 5,
			asc: false,
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		console.log(e);
		this.setState({
			currentPage: Number(e),
		});
	}

	componentDidMount() {
		this.props.getAllCommunities();
	}

	componentWillReceiveProps(nextProps) {
		console.log("Next props", nextProps.searchCommunity);
		if (nextProps.searchCommunity) {
			this.setState({
				allCommunities: nextProps.searchCommunity,
			});
		}
	}

	onSearch = (e) => {
		this.setState({ search: e.target.value });
	};
	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	sortByPosts = () => {
		this.setState({ asc: !this.state.asc });
		let posts = this.state.allCommunities;
		if (this.state.asc === false) {
			posts.sort((a, b) => {
				if (a.posts.length > b.posts.length) {
					return -1;
				}
				if (a.posts.length < b.posts.length) {
					return 1;
				}
				return 0;
			});
			this.setState({
				...posts,
				allCommunities: posts,
			});
		} else {
			posts.sort((a, b) => {
				if (a.posts.length < b.posts.length) {
					return -1;
				}
				if (a.posts.length > b.posts.length) {
					return 1;
				}
				return 0;
			});
			this.setState({
				...posts,
				allCommunities: posts,
			});
		}
	};

	sortByDate = () => {
		this.setState({ asc: !this.state.asc });
		let date = this.state.allCommunities;
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
				...date,
				allCommunities: date,
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
				...date,
				allCommunities: date,
			});
		}
	};
	sortByVotes = () => {
		this.setState({ asc: !this.state.asc });
		let votes = this.state.allCommunities;
		if (this.state.asc === false) {
			votes.sort((a, b) => {
				if (a.votes > b.votes) {
					return -1;
				}
				if (a.votes < b.votes) {
					return 1;
				}
				return 0;
			});
			this.setState({
				...votes,
				allCommunities: votes,
			});
		} else {
			votes.sort((a, b) => {
				if (a.votes < b.votes) {
					return -1;
				}
				if (a.votes > b.votes) {
					return 1;
				}
				return 0;
			});
			this.setState({
				...votes,
				allCommunities: votes,
			});
		}
	};
	sortByUsers = () => {
		let user = this.state.allCommunities;
		this.setState({ asc: !this.state.asc });
		if (this.state.asc === false) {
			user.sort((a, b) => {
				if (a.communityMembers.length > b.communityMembers.length) {
					return -1;
				}
				if (a.communityMembers.length < b.communityMembers.length) {
					return 1;
				}
				return 0;
			});
			this.setState({
				...user,
				allCommunities: user,
			});
		} else {
			user.sort((a, b) => {
				if (a.communityMembers.length < b.communityMembers.length) {
					return -1;
				}
				if (a.communityMembers.length > b.communityMembers.length) {
					return 1;
				}
				return 0;
			});
			this.setState({
				...user,
				allCommunities: user,
			});
		}
	};

	getTotalPosts = (posts) => {
		return posts.length > 0 ? posts.length : 0;
	};

	getRequestedUsers = (members) => {
		return members.length > 0
			? members.filter((value) => value.acceptStatus === 0).length
			: 0;
	};

	incrementVote = (upvote, cId) => {
		const upvoteData = {
			vote: upvote + 1,
			comID: cId,
		};
		console.log("upvoteData", upvoteData);
		axios
			.post(`${backendURI}/api/search/updateVote`, upvoteData)
			.then((response) => {
				console.log("response status", response.status);
				if (response.status === 200) {
					this.props.getAllCommunities();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	decrementVote = (downvote, cId) => {
		const downVoteData = {
			vote: downvote + -1,
			comID: cId,
		};
		console.log("downVoteData", downVoteData);
		axios
			.post(`${backendURI}/api/search/updateVote`, downVoteData)
			.then((response) => {
				console.log("response status", response.status);
				if (response.status === 200) {
					this.props.getAllCommunities();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		let redirectVar = null;
		if (!localStorage.getItem("token")) {
			redirectVar = <Redirect to="/Login" />;
		}
		console.log("Search Community Details:", this.state.allCommunities);

		const { search } = this.state;

		let communityList = this.state.allCommunities;
		console.log("communityList", communityList);

		let searchList = communityList.filter((community) => {
			return (
				community.communityName.toLowerCase().indexOf(search.toLowerCase()) !==
				-1
			);
		});

		const currentPage = this.state.currentPage;
		const itemsPerPage = this.state.itemsPerPage;
		const indexOfLastTodo = currentPage * itemsPerPage;
		const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;

		const currentItem =
			this.state.search && this.state.search.length > 0
				? searchList
				: communityList.slice(indexOfFirstTodo, indexOfLastTodo);
		const pageNumbers = [];

		for (let i = 1; i <= Math.ceil(communityList.length / itemsPerPage); i++) {
			pageNumbers.push(i);
		}

		let renderPageNumbers = null;

		renderPageNumbers = (
			<nav aria-label="Page navigation example" class="pagebar">
				<ul class="pagination">
					{pageNumbers.map((i) => (
						<li class="page-item">
							<a
								key={i}
								id={i}
								onClick={() => {
									this.handleClick(i);
								}}
								class="page-link"
								href="#"
							>
								{i}
							</a>
						</li>
					))}
				</ul>
			</nav>
		);

		return (
			<div className="container-fluid">
				{redirectVar}
				<NavbarMain />
				<div className="container">
					<div>
						<h2 className="mt-2">All Communities</h2>
						<div className="searchbar">
							<label htmlFor="searchbar">
								<SearchIcon />
							</label>
							<input
								id="search"
								placeholder="Search"
								type="search"
								onChange={this.onSearch}
							/>
						</div>
						<div className="main-bar">
							<div className="filter-container">
								<div className="filter-element hoverable">
									<span>Sort By:</span>
								</div>
								<div
									className="filter-element hoverable"
									onClick={() => {
										this.sortByPosts();
									}}
								>
									<span className="db-sort-types">Most Number Of Posts</span>
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
									className="filter-element hoverable"
									onClick={() => {
										this.sortByUsers();
									}}
								>
									<span className="db-sort-types">Most Users</span>
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
						</div>
					</div>
					<div className="posts-wrapper">
						{currentItem && currentItem.length > 0
							? currentItem.map((value) => (
									<div className="post">
										<div className="post-sidebar">
											<ArrowUpwardIcon
												className="upvote"
												onClick={() =>
													this.incrementVote(value.votes, value._id)
												}
											/>
											<span>{value.votes}</span>
											<ArrowDownwardIcon
												className="downvote"
												onClick={() =>
													this.decrementVote(value.votes, value._id)
												}
											/>
										</div>
										<div className="post-title" style={{ marginLeft: "850px" }}>
											{value.createdAt.split("T")[0]}
										</div>

										<span className="title">
											<Link
												className="text-decoration-none text-dark h4"
												to={`/community/:${value.communityName}`}
												onClick={() => {
													localStorage.setItem("communityid", value._id);
												}}
											>
												<strong>r/{value.communityName}</strong>
											</Link>
										</span>

										<div className="post-footer">
											<div className="comments footer-action">
												<span>
													<img
														src={person}
														alt="person"
														height="15"
														width="15"
														className="person-img"
													></img>{" "}
													{this.getRequestedUsers(value.communityMembers)}
												</span>
												&nbsp;&nbsp;&nbsp;&nbsp;
												<span>
													{" "}
													<img
														src={post}
														alt="person"
														height="15"
														width="15"
														className="post-img"
													></img>
													{this.getTotalPosts(value.posts)}
												</span>
											</div>
										</div>
									</div>
							  ))
							: "No Communities to display"}
					</div>
					<div className="mt-2">{renderPageNumbers}</div>
				</div>
			</div>
		);
	}
}

AllCommunities.propTypes = {
	searchCommunity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		searchCommunity: state.searchCommunity.searchCommunity,
	};
};

export default connect(mapStateToProps, { getAllCommunities })(AllCommunities);
