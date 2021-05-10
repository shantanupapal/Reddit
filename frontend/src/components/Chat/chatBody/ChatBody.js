import React, { Component } from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import axios from "axios";
import { backendURI } from "../../../utils/config";

export default class ChatBody extends Component {
    state = {
        allChats: [],
        flag: 0,
        chat: {},
    };

    openChat = async (data) => {
        await this.setState({ chat: data, flag: 1 });
    };

    componentWillMount = async () => {
        const allChats = [];
        const user_id = localStorage.getItem("userid");
        // const user_id = "609453c6b6b2ec490cdbc0ce";
        const Chats = await axios.get(
            `${backendURI}/chat/getallchats/${user_id}`
        );
        this.setState({
            ...this.state,
            allChats: Chats.data,
        });
        console.log(Chats);
    };

    render() {
        let chatContent;
        if (this.state.flag) {
            // const user_id = "";
            const user_id = localStorage.getItem("userid");
            chatContent = (
                <ChatContent chat={this.state.chat} user_id={user_id} />
            );
        } else {
            chatContent = <div>Please select a chat</div>;
        }

        return (
            <div className="main__chatbody">
                <ChatList
                    allChats={this.state.allChats}
                    handleClick={this.openChat}
                />

                {chatContent}
            </div>
        );
    }
}
