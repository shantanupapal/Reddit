import React from "react";

import "./Content.css";
// import TrendingToday from "./trending-today/TrendingToday";
import MainBar from "./main-bar/MainBar";
import Posts from "./posts/Posts";
import SideBar from "./side-bar/SideBar";

export default function Content() {
    return (
        <div className="content">
            <div className="bars-wrapper">
                <div className="bars-wrapper-inside">
                    <MainBar />
                    <SideBar />
                </div>
            </div>
        </div>
    );
}
