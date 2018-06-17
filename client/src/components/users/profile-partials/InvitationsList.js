import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import * as invitationsActions from '../../../actions/invitations.actions';

class InvitationsList extends Component {
    state = { activePage: 1 };

    componentDidMount() {
        this.props.getInvitations(this.props.userId, 1);
    }

    render() {
        return (
            [
                <div key="title" className="line text-center">
                    <i className="icon-user-follow text-primary text-size-40"></i>
                    <h2 className="text-dark text-size-40 text-m-size-30">{this.props.title}</h2>
                    <hr className="break background-primary break-small break-center margin-bottom-50" />
                </div>,
                this.props.invitations.length > 0 ?
                    [<div key="requests-list" className="row">
                        <div className="people-nearby">
                            {this.props.invitations.map(invitation =>
                                <div key={invitation._id} className="nearby-user">
                                    <div className="row">
                                        <div className="col-md-2 col-sm-2">
                                            <Link to={"/users/" + invitation.sender.username}>
                                                <img src={invitation.sender.photo} alt="user" className="profile-photo-lg" />
                                            </Link>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <Link to={"/users/" + invitation.sender.username}>
                                                <h5 className="profile-link">{invitation.sender.first_name} {invitation.sender.last_name}</h5>
                                                <p>{invitation.sender.username}</p>
                                            </Link>
                                        </div>
                                        <div className="col-md-2 col-sm-2">
                                            <button className="btn btn-main-green pull-right" onClick={(event) => this.props.acceptInvitation(invitation._id)}>Accept</button>
                                        </div>
                                        <div className="col-md-2 col-sm-2">
                                            <button className="btn pull-right" onClick={(event) => this.props.declineInvitation(invitation._id)}>Decline</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>,
                    <div key="pages" className="row">
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={this.props.invitationsCount}
                            pageRangeDisplayed={5}
                            onChange={this.selectPage}
                        />
                    </div>]
                    :
                    <div key="no-items" className="no-elements">You have no invitations.</div>
            ]
        );
    }

    selectPage = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        this.props.getInvitations(this.props.userId, pageNumber);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        invitations: state.users.invitations,
        invitationsCount: state.users.invitationsCount,
        userId: ownProps.userId
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getInvitations: (id, page) => dispatch(invitationsActions.getInvitations(id, page)),
        acceptInvitation: (id) => dispatch(invitationsActions.acceptInvitation(id)),
        declineInvitation: (id) => dispatch(invitationsActions.declineInvitation(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitationsList);