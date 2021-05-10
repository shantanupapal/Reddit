import React, { Component } from "react";
import Avatar from "./Avatar";
import chat2 from "../../../images/chat2.png";
export default class ChatListItems extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                style={{ animationDelay: `0.${this.props.animationDelay}s` }}
                onClick={() => {
                    this.props.handleClick(this.props.chat);
                }}
                className={`chatlist__item ${
                    this.props.active ? this.props.active : ""
                } `}
            >
                <Avatar image={chat2} />

                <div className="userMeta">
                    <p>{this.props.name}</p>
                    <span className="activeTime">Last Message</span>
                </div>
            </div>
        );
    }
}
