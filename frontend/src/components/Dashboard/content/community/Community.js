import React from "react";

import "./Community.css";

import communties from "../../../../data/communties/communities.json";

import ArrowDropUp from "@material-ui/icons/ArrowDropUp";

export default function Community() {
    return (
        <div className="community-section">
            <div className="title">
                <span className="hoverable">My Communities</span>
            </div>
            <div className="communities-wrapper">
                {communties.map((community, index) => (
                    <div className="community hoverable">
                        <span>{index + 1}</span>
                        <ArrowDropUp />
                        <img src={community.image_src} />
                        <span className="name">r/{community.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
