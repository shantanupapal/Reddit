import React, { Component } from "react";
import NavbarMain from "../../Layout/NavbarMain";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllCommunities } from "../../../redux/actions/moderationActions";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PeopleIcon from "@material-ui/icons/GroupAdd";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import ShowUsers from "./ShowUsers";
import JoinedUsers from "./JoinedUsers";
import "./moderation.css";
import "../../Layout/searchbar.css";
import SearchIcon from "@material-ui/icons/Search";
class Moderation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: localStorage.getItem("userid"),
			allCommunitiesData: [],
			search: "",
			currentPage: 1,
			itemsPerPage: 5,
		};

		this.getRequestedUsers = this.getRequestedUsers.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = (e) => {
		console.log(e);
		this.setState({
			currentPage: Number(e),
		});
	};

	onSearch = (e) => {
		this.setState({ search: e.target.value });
	};
	onChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	componentDidMount() {
		const user = { userid: this.state.userId };
		console.log("user Data : ", user);
		this.props.getAllCommunities(user);
	}

	getRequestedUsers = (members) => {
		return members.length > 0
			? members.filter((value) => value.acceptStatus === 0).length
			: 0;
	};

	getJoinedUsers = (members) => {
		return members.length > 0
			? members.filter((value) => value.acceptStatus === 1).length
			: 0;
	};

	componentWillReceiveProps(nextProps) {
		console.log("Next props", nextProps.allCommunities);
		if (nextProps.allCommunities) {
			this.setState({
				allCommunitiesData: nextProps.allCommunities,
			});
		}
	}

	render() {
		let redirectVar = null;
		if (!localStorage.getItem("token")) {
			redirectVar = <Redirect to="/Login" />;
		}
		let communityData = this.state.allCommunitiesData;
		console.log("communityData: ", communityData);
		const { search } = this.state;
		let searchList = communityData.filter((community) => {
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
				: communityData.slice(indexOfFirstTodo, indexOfLastTodo);
		const pageNumbers = [];
		console.log("currentItem: ", currentItem);

		for (let i = 1; i <= Math.ceil(communityData.length / itemsPerPage); i++) {
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
					<h4>Community Moderation</h4>
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
					{currentItem && currentItem.length > 0 ? (
						<div>
							{currentItem.map((com) => (
								<Card className="root">
									<CardHeader
										avatar={<Avatar aria-label="recipe">R</Avatar>}
										title={<ShowUsers community={com} />}
									/>
									<CardActions>
										<IconButton>
											<PeopleIcon />
										</IconButton>
										{"User Requests "}
										{this.getRequestedUsers(com.communityMembers)}
										<IconButton>
											<PeopleAltIcon />
										</IconButton>
										<JoinedUsers community={com} />
										{": "}
										{this.getJoinedUsers(com.communityMembers)}
									</CardActions>
								</Card>
							))}
						</div>
					) : (
						<div>
							<h5 className="text-primary">No communities present</h5>
						</div>
					)}{" "}
					<div className="mt-2">{renderPageNumbers}</div>
				</div>
			</div>
		);
	}
}

Moderation.propTypes = {
	getAllCommunities: PropTypes.func.isRequired,
	//updateUser: PropTypes.func.isRequired,
	allCommunities: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
	return {
		allCommunities: state.moderation.allCommunities,
	};
};

export default connect(mapStateToProps, { getAllCommunities })(Moderation);
