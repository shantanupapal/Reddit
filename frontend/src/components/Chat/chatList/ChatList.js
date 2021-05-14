import React, { useEffect, useState, useRef } from "react";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import swal from "sweetalert";
import { backendURI } from "../../../utils/config";
import axios from "axios";

export default function ChatList({ handleClick }) {
    const [display, setdisplay] = useState(false);
    const [options, setoptions] = useState([]);
    const [search, setsearch] = useState("");
    const [allChats, setallChats] = useState([]);
    const [allUsers, setallUsers] = useState([]);
    // const [newChat, setnewChat] = useState(null);
    const [allNames, setallNames] = useState([]);
    const wrapperRef = useRef(null);

    const user_id = localStorage.getItem("userid");
    // const user_id = "609453c6b6b2ec490cdbc0ce";
    const getAllChats = async () => {
        const Chats = await axios.get(
            `${backendURI}/chat/getallchats/${user_id}`
        );

        setallChats(Chats.data);
    };
    const names = [];
    useEffect(() => {
        getAllChats();

        axios
            .get(`${backendURI}/chat/getallusers`)
            .then((res) => {
                const user_id = localStorage.getItem("userid");
                setallUsers(res.data);
                setoptions(res.data);
                res.data.forEach((user) => {
                    if (user_id !== user._id) {
                        names.push(user.userName);
                    }
                });
            })
            .then(() => {
                setallNames(names);
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

    const addNewChat = async () => {
        if (!search) {
            swal(
                "Opps!",
                "Please search for a user to start a chat",
                "warning"
            );
        } else {
            if (allNames.includes(search)) {
                let new_chat_user;
                allUsers.forEach((user) => {
                    if (user.userName === search) {
                        new_chat_user = user._id;
                    }
                });

                let message = {
                    sender: localStorage.getItem("userid"),
                    receiver: new_chat_user,
                    msgContent: `Hi, ${localStorage.getItem(
                        "userName"
                    )} wants to have a chat with you.`,
                };
                const result = await axios.post(
                    `${backendURI}/chat/sendmessage`,
                    message
                );
                if (result) {
                    await getAllChats();
                }
            } else {
                swal("", "Please select a user from the list", "error");
            }
        }
    };

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
                <button className="btn-nobg" onClick={addNewChat}>
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
