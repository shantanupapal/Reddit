/* eslint-disable */
import React from "react";
import Navbar from "../Layout/Navbar";
import background from "../../images/reddit-bg.png";
import "../../App.css";
const Landing = () => {
	return (
		<div className="landing">
			<Navbar />
			<div>
				<img
					src={background}
					alt="background"
					className="img-fluid"
					style={{
						width: "1800px",
						height: "700px",
						marginTop: "100px",
						marginLeft: "200px",
					}}
				/>
			</div>
		</div>
	);
};
export default Landing;
