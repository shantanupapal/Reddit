import React, { Component } from "react";
import NavbarMain from "../../Layout/NavbarMain";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllCommunities } from "../../../redux/actions/moderationActions";
class Moderation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			allCommunities: [],
			userId: localStorage.getItem("userid"),
		};
	}

	componentDidMount() {
		const user = { userid: this.state.userId };
		console.log("user Data : ", user);
		this.props.getAllCommunities(user);
	}

	render() {
		let redirectVar = null;
		// if (!localStorage.getItem("token")) {
		// 	redirectVar = <Redirect to="/Login" />;
		// }
		return (
			<div>
				{redirectVar}
				<NavbarMain />
				Moderation Page
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
