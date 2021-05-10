import React, { Component } from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";

export default class ChatBody extends Component {
    state = {
        allChats: [],
        flag: 0,
        chat: {},
        newUser: "",
    };

    openChat = async (data) => {
        await this.setState({ chat: data, flag: 1 });
    };

    render() {
        let chatContent;
        if (this.state.flag) {
            // const user_id = "";
            const user_id = localStorage.getItem("userid");
            let userName = this.state.chat.user1
                ? this.state.chat.user1.userName
                : this.state.chat.user2.userName;

            chatContent = (
                <ChatContent
                    username={userName}
                    chat={this.state.chat}
                    user_id={user_id}
                />
            );
        } else {
            chatContent = <div>Please select a chat</div>;
        }

        return (
            <div className="main__chatbody">
                <ChatList handleClick={this.openChat} />

                {chatContent}
            </div>
        );
    }
}
