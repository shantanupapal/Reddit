import React from "react";
import "./Chat.css";
// import Nav from "./components/nav/Nav";
import ChatBody from "./chatBody/ChatBody";
import NavbarMain from "../Layout/NavbarMain";

function Chat() {
    return (
        <>
            <NavbarMain />

            <div className="__main">
                <ChatBody />
            </div>
        </>
    );
}

export default Chat;
