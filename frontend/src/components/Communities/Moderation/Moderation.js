import React, { Component } from "react";
import NavbarMain from "../../Layout/NavbarMain";
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
class Moderation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: localStorage.getItem("userid"),
		};

		this.getRequestedUsers = this.getRequestedUsers.bind(this);
	}

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

	render() {
		let redirectVar = null;
		let communityData = this.props.allCommunities;
		console.log("communityData: ", communityData);

		return (
			<div className="container-fluid">
				{redirectVar}
				<NavbarMain />

				<div className="container">
					<h4>Community Moderation</h4>
					{communityData && communityData.length > 0 ? (
						<div>
							{communityData.map((com) => (
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
					)}
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
