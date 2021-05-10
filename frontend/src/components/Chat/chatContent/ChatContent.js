import React, { Component } from "react";

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import chat1 from "../../../images/chat1.png";
import chat2 from "../../../images/chat2.png";

export default class ChatContent extends Component {
    chatItms = [
        {
            key: 1,
            image: chat2,
            type: "",
            msg: "Hi, How are you?",
        },
        {
            key: 2,
            image: chat1,
            type: "other",
            msg: "I am fine.",
        },
        {
            key: 3,
            image: chat1,
            type: "other",
            msg: "What about you?",
        },
        {
            key: 4,
            image: chat2,
            type: "",
            msg: "Awesome",
        },
        {
            key: 5,
            image: chat2,
            type: "",
            msg: "Let's Meet",
        },
        {
            key: 3,
            image: chat1,
            type: "other",
            msg: "Sure!",
        },
    ];

    constructor(props) {
        super(props);
        this.state = {
            chat: this.chatItms,
            msg: "",
        };
    }

    componentDidMount() {}
    onStateChange = (e) => {
        this.setState({ msg: e.target.value });
    };

    render() {
        return (
            <div className="main__chatcontent">
                <div className="content__header">
                    <div className="blocks">
                        <div className="current-chatting-user">
                            <Avatar image={chat1} />
                            <p>Shantanu Papal</p>
                        </div>
                    </div>

                    {/*<div className="blocks">
                      <div className="settings">
                          <button className="btn-nobg">
                              <i className="fa fa-cog"></i>
                          </button>
                      </div>
        </div>*/}
                </div>
                <div className="content__body">
                    <div className="chat__items">
                        {this.state.chat.map((itm, index) => {
                            return (
                                <ChatItem
                                    animationDelay={index + 2}
                                    key={itm.key}
                                    user={itm.type ? itm.type : "me"}
                                    msg={itm.msg}
                                    image={itm.image}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="content__footer">
                    <div className="sendNewMessage">
                        {/*<button className="addFiles">
                          <i className="fa fa-plus"></i>
                      </button>*/}
                        <input
                            type="text"
                            placeholder="Message "
                            onChange={this.onStateChange}
                            value={this.state.msg}
                        />
                        <button className="btnSendMsg" id="sendMsgBtn">
                            <i className="fa fa-angle-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
