import React, { useEffect, useState, useRef } from "react";
import NavbarMain from "../Layout/NavbarMain";
import swal from "sweetalert";
import { backendURI } from "../../utils/config";
import axios from "axios";
import "./Invitation.css";
import sidebar from "../../images/community-sidebar.png";
import Invitations from "./invitations";

export default function Invitation() {
    const [display, setdisplay] = useState(false);
    const [displayC, setdisplayC] = useState(false);
    const [options, setoptions] = useState([]);
    const [optionsC, setoptionsC] = useState([]);
    const [search, setsearch] = useState("");
    const [searchC, setsearchC] = useState("");
    const [allCommunities, setallCommunities] = useState([]);
    const [allCommunitiesNames, setallCommunitiesNames] = useState([]);
    const [allUsers, setallUsers] = useState([]);
    const [allNames, setallNames] = useState([]);
    const wrapperRef = useRef(null);

    // const user_id = localStorage.getItem("userid");

    const names = [];
    const communityNames = [];
    useEffect(() => {
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
        const user_id = localStorage.getItem("userid");
        axios
            .get(`${backendURI}/invitation/getallcommunities/${user_id}`)
            .then((res) => {
                console.log(res.data);
                // const user_id = localStorage.getItem("userid");
                setallCommunities(res.data);
                setoptionsC(res.data);
                res.data.forEach((community) => {
                    communityNames.push(community.communityName);
                });
            })
            .then(() => {
                setallCommunitiesNames(communityNames);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // useEffect(() => {
    //     document.addEventListener("mousedown", handleClickOutside);

    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);

    // const handleClickOutside = (e) => {
    //     const { current: wrap } = wrapperRef;
    //     if (wrap && !wrap.contains(e.target)) {
    //         setdisplay(false);
    //         setdisplayC(false);
    //     }
    // };

    const setNames = (name) => {
        setsearch(name);
        setdisplay(false);
    };

    const setCommunityNames = (name) => {
        setsearchC(name);
        setdisplayC(false);
    };

    const addNewMember = async () => {
        if (!search) {
            swal(
                "Opps!",
                "Please search for a user and select one. User field cannot be empty",
                "warning"
            );
        } else if (!searchC) {
            swal(
                "Opps!",
                "Please search for a community and select one. Community field cannot be empty",
                "warning"
            );
        } else {
            if (
                allNames.includes(search) &&
                allCommunitiesNames.includes(searchC)
            ) {
                let inv_user;
                allUsers.forEach((user) => {
                    if (user.userName === search) {
                        inv_user = user._id;
                    }
                });
                let inv_community;
                allCommunities.forEach((community) => {
                    if (community.communityName === searchC) {
                        inv_community = community._id;
                    }
                });
                let invitation = {
                    user_id: inv_user,
                    community_id: inv_community,
                };

                const invite_result = await axios.post(
                    `${backendURI}/invitation/sendinvite`,
                    invitation
                );
                if (invite_result) {
                    console.log(invite_result);
                }
            } else {
                swal(
                    "",
                    "Either User or Community doesn't exists. Please select from the list",
                    "error"
                );
            }
        }
    };

    return (
        <>
            <NavbarMain />

            <div className="container inv-container align-items-center justify-content-center">
                <div className="row align-items-center justify-content-center inv-row">
                    <div className="col-sm-3 inv-invite">Invite :</div>

                    <div className="col-sm-3">
                        <span className="inv-span-tag">User : </span>
                        <div className="chatList__search">
                            <div
                                className="search_wrap"
                                ref={wrapperRef}
                                // style={{ display: "inline-block" }}
                            >
                                <input
                                    type="text"
                                    placeholder="Search User"
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
                                                    userName.indexOf(search) >
                                                    -1
                                            )
                                            .map((user) => {
                                                return (
                                                    <div
                                                        onClick={() => {
                                                            setNames(
                                                                user.userName
                                                            );
                                                        }}
                                                        className="option"
                                                        key={user._id}
                                                        style={{
                                                            padding:
                                                                "4px 4px 4px 15px",
                                                            borderTop:
                                                                "1px solid #000",
                                                        }}
                                                    >
                                                        <span>
                                                            {user.userName}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        {" "}
                        <span className="inv-span-tag">Community : </span>
                        <div className="chatList__search">
                            <div
                                className="search_wrap"
                                ref={wrapperRef}
                                // style={{ display: "inline-block" }}
                            >
                                <input
                                    type="text"
                                    placeholder="Search Community"
                                    value={searchC}
                                    onChange={(e) => {
                                        if (!displayC) {
                                            setdisplayC(true);
                                        }
                                        setsearchC(e.target.value);
                                    }}
                                />
                                {displayC && (
                                    <div className="autoContainer">
                                        {optionsC
                                            .filter(
                                                ({ communityName }) =>
                                                    communityName.indexOf(
                                                        searchC
                                                    ) > -1
                                            )
                                            .map((community) => {
                                                return (
                                                    <div
                                                        onClick={() => {
                                                            setCommunityNames(
                                                                community.communityName
                                                            );
                                                        }}
                                                        className="option"
                                                        key={community._id}
                                                        style={{
                                                            padding:
                                                                "4px 4px 4px 15px",
                                                            borderTop:
                                                                "1px solid #000",
                                                        }}
                                                    >
                                                        <span>
                                                            {
                                                                community.communityName
                                                            }
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 inv-btn">
                        <button
                            className="btn-nobg inv-plus"
                            onClick={addNewMember}
                        >
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <Invitations invitations={allCommunities} />
                </div>
            </div>
        </>
    );
}
