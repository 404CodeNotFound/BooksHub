import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InvitationsList extends Component {
    render() {
        return (
            [
                <div key="reuests-title" className="row title">
                    <h3>{this.props.title}</h3>
                </div>,
                <div className="row">
                    <div className="people-nearby">
                        {this.props.invitations.map(invitation =>
                            <div className="nearby-user">
                                <div className="row">
                                    <Link to={"/users/" + invitation.sender.username}>
                                        <div className="col-md-2 col-sm-2">
                                            <img src={invitation.sender.photo} alt="user" className="profile-photo-lg" />
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <h5 className="profile-link">{invitation.sender.first_name} {invitation.sender.last_name}</h5>
                                            <p>{invitation.sender.username}</p>
                                        </div>
                                    </Link>
                                    <div className="col-md-2 col-sm-2">
                                        <button className="btn btn-main-green pull-right">Accept</button>
                                    </div>
                                    <div className="col-md-2 col-sm-2">
                                        <button className="btn pull-right">Decline</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>,
                    <div key="pages" className="row">
                        <div className="col-md-offset-5 pages total center">
                            Page 1 of 1
                                <div className="pagination-container center">
                                <ul className="pagination">
                                    <li className="active">
                                        <a>1</a>
                                    </li>
                                    <li>
                                        <a>2</a>
                                    </li>
                                    <li>
                                        <a>3</a>
                                    </li>
                                    <li>
                                        <a>4</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ]
        );
    }
}

export default InvitationsList;