import React, { Component } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import chat1 from "../../../images/chat1.png";
import chat2 from "../../../images/chat2.png";

const photo = chat1;
const photo2 = chat2;

export default class ChatList extends Component {
    // allChatUsers = [
    //     {
    //         image: photo,
    //         id: 1,
    //         name: "Shantanu Papal",
    //     },
    //     {
    //         image: photo2,
    //         id: 2,
    //         name: "Anish",
    //     },
    //     {
    //         image: photo2,
    //         id: 3,
    //         name: "Sumeet",
    //     },
    //     {
    //         image: photo,
    //         id: 4,
    //         name: "Payal G",
    //     },
    //     {
    //         image: photo2,
    //         id: 5,
    //         name: "Paras",
    //     },
    //     {
    //         image: photo,
    //         id: 6,
    //         name: "Devika",
    //     },
    // ];
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         allChats: this.allChatUsers,
    //     };
    // }
    render() {
        const { allChats } = this.props;
        return (
            <div className="main__chatlist">
                <div className="chatlist__heading">
                    <h2>Chats</h2>
                    <button className="btn-nobg">
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
                <div className="chatList__search">
                    <div className="search_wrap">
                        <input type="text" placeholder="Search Here" required />
                        <button className="search-btn">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
                <div className="chatlist__items">
                    {allChats.map((chat, index) => {
                        let name = "";
                        if (chat.user1) {
                            name = chat.user1.userName;
                        } else if (chat.user2) {
                            name = chat.user2.userName;
                        }
                        return (
                            <ChatListItems
                                handleClick={this.props.handleClick}
                                name={name}
                                key={chat._id}
                                animationDelay={index + 1}
                                image={chat.image}
                                chat={chat}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
