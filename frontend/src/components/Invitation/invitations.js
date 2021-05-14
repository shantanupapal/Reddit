import React, { Component } from "react";
import "./Invitation.css";
export class Invitations extends Component {
    render() {
        const invitations = this.props.invitations;
        const show_invitation = [];

        invitations.forEach((invitation) => {
            const add_show_inv = [];
            const add_members = [];
            add_show_inv.push(invitation.communityName);
            invitation.communityMembers.forEach((member) => {
                const add_member = [];
                if (member.acceptStatus === 0) {
                    add_member.push(member._id.userName, "Invited");
                    add_members.push(add_member);
                } else if (member.acceptStatus === 1) {
                    add_member.push(member._id.userName, "Accepted");
                    add_members.push(add_member);
                } else {
                    add_member.push(member._id.userName, "Rejected");
                    add_members.push(add_member);
                }
            });
            add_show_inv.push(add_members);
            show_invitation.push(add_show_inv);
        });

        // const members = invitations.communityMembers;
        console.log(show_invitation);

        let show;
        if (show_invitation.length) {
            show = show_invitation.map((invite) => {
                return (
                    <>
                        <div className="row inv-prev">Previous Invitations</div>
                        <div
                            className="container inv-member-container"
                            key={invite[0]}
                        >
                            <div className="row align-items-center justify-content-start inv-tag-container">
                                <div className="col-sm-2"></div>
                                <div className="col inv-tags">Community</div>
                                <div className="col inv-tags">Members</div>
                                <div className="col-sm-2"></div>
                            </div>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-sm-2"></div>
                                <div className="col inv-comname">
                                    {invite[0]}
                                </div>
                                <div className="col inv-all-members">
                                    {invite[1].map((member) => {
                                        return (
                                            <div
                                                key={member[0]}
                                                className="row align-items-center justify-content-center inv-members"
                                            >
                                                <div className="col-sm-6">
                                                    <span>{member[0]}</span>
                                                </div>
                                                <div className="col-sm-3"></div>
                                                <div className="col-sm-3">
                                                    <span className="inv-status">
                                                        {member[1]}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="col-sm-2"></div>
                            </div>
                        </div>
                    </>
                );
            });
        } else {
            show = (
                <div>No invites. Invite users to your communities above.</div>
            );
        }

        return <>{show}</>;
    }
}

export default Invitations;
