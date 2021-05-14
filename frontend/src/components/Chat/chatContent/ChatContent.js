import React, { Component } from "react";
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import chat1 from "../../../images/chat1.png";

import { backendURI } from "../../../utils/config";
import axios from "axios";

export default class ChatContent extends Component {
    timeout;
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.getMsg();
        this.timeout = setInterval(this.getMsg, 3000);
    }
    componentWillReceiveProps(props) {
        this.props = props;
        this.getMsg();
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    getMsg = async () => {
        console.log(this.props.user_id);
        let { data: current_chat } = await axios.get(
            `${backendURI}/chat/getchat/${this.props.user_id}/${this.props.chat._id}`
        );
        await this.setState({ current_chat });
    };

    sendMsg = async (e) => {
        if (this.state && this.state.new_message) {
            let data = {
                sender: this.props.user_id,
                receiver:
                    this.state && this.state.current_chat.user1
                        ? this.state.current_chat.user1._id
                        : this.state.current_chat.user2._id,
                chat_id: this.props.chat._id,
                msgContent: this.state.new_message,
            };
            this.setState({
                new_message: "",
            });
            let response = await axios.post(
                `${backendURI}/chat/sendmessage`,
                data
            );
            if (response) {
                this.getMsg();
            }
        }
    };

    onNewMessage = (e) => {
        let new_message = this.state.new_message;
        new_message = e.target.value;
        this.setState({ new_message: new_message });
    };

    render() {
        if (!this.state.current_chat) {
            return (
                <div className="main__chatbody">
                    <h2>
                        Please select a chat from chat list or start a new one
                    </h2>
                </div>
            );
        }

        return (
            <div className="main__chatcontent">
                <div className="content__header">
                    <div className="blocks">
                        <div className="current-chatting-user">
                            <Avatar image={chat1} />
                            <div style={{ display: "block" }}>
                                {this.props.username}
                            </div>
                            <br />
                        </div>
                        <div className="current-chatting-user-quote">
                            This is the start of a beautiful thing. Say
                            something nice, or share a cat fact.
                        </div>
                    </div>
                </div>
                <div className="content__body">
                    <div className="chat__items">
                        {this.state.current_chat.message.map((itm, index) => {
                            return (
                                <ChatItem
                                    animationDelay={index + 2}
                                    key={itm._id}
                                    user={"other"}
                                    msg={itm.msgContent}
                                    image={itm.image}
                                    name={itm.sender.userName}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="content__footer">
                    <div className="sendNewMessage">
                        <input
                            type="text"
                            name="new_message"
                            placeholder="Message "
                            onChange={this.onNewMessage}
                            value={this.state.new_message}
                        />
                        <button
                            className="btnSendMsg"
                            id="sendMsgBtn"
                            onClick={this.sendMsg}
                        >
                            <i className="fa fa-angle-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
