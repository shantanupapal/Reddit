import React from "react";

import SearchIcon from "@material-ui/icons/Search";
import "./searchbar.css";

export default function Searchbar() {
	return (
		<div className="searchbar">
			<label htmlFor="searchbar">
				<SearchIcon />
			</label>
			<input id="searchbar" placeholder="Search" />
		</div>
	);
}
