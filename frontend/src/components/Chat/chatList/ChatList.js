import React, { useEffect, useState, useRef } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import chat1 from "../../../images/chat1.png";
import chat2 from "../../../images/chat2.png";

import { backendURI } from "../../../utils/config";
import axios from "axios";
const photo = chat1;
const photo2 = chat2;

export default function ChatList({ allChats, handleClick }) {
    const [display, setdisplay] = useState(false);
    const [options, setoptions] = useState([]);
    const [search, setsearch] = useState("");
    const wrapperRef = useRef(null);

    useEffect(() => {
        const names = [];
        axios
            .get(`${backendURI}/chat/getallusers`)
            .then((res) => {
                const user_id = localStorage.getItem("userid");
                res.data.forEach((user) => {
                    if (user_id !== user._id) {
                        names.push(user);
                    }
                });
            })
            .then(() => {
                setoptions(names);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (e) => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(e.target)) {
            setdisplay(false);
        }
    };
    const setNames = (name) => {
        setsearch(name);
        setdisplay(false);
    };

    return (
        <div className="main__chatlist">
            <div className="chatlist__heading">
                <h2>Chats</h2>
            </div>
            <div className="chatList__search">
                <div
                    className="search_wrap"
                    ref={wrapperRef}
                    style={{ display: "inline-block" }}
                >
                    <input
                        type="text"
                        placeholder="Search Here"
                        value={search}
                        onChange={(e) => {
                            if (!display) {
                                setdisplay(true);
                            }
                            setsearch(e.target.value);
                        }}
                    />
                    {display && (
                        <div className="autoContainer">
                            {options
                                .filter(
                                    ({ userName }) =>
                                        userName.indexOf(search) > -1
                                )
                                .map((user) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                setNames(user.userName);
                                            }}
                                            className="option"
                                            key={user._id}
                                            style={{
                                                padding: "4px 4px 4px 15px",
                                                borderTop: "1px solid #000",
                                            }}
                                        >
                                            <span>{user.userName}</span>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
                <button className="btn-nobg">
                    <i className="fa fa-plus"></i>
                </button>
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
                            handleClick={handleClick}
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
