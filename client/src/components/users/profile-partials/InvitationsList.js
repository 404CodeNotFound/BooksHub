import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import * as invitationsActions from '../../../actions/invitations.actions';

class InvitationsList extends Component {
    state = { activePage: 1 };
    render() {
        return (
            [
                <div key="requests-title" className="row title">
                    <h3>{this.props.title}</h3>
                </div>,
                <div key="requests-list" className="row">
                    <div className="people-nearby">
                        {this.props.invitations.map(invitation =>
                            <div key={invitation._id} className="nearby-user">
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
                        itemsCountPerPage={1}
                        totalItemsCount={this.props.invitationsCount}
                        pageRangeDisplayed={5}
                        onChange={this.selectPage}
                    />
                </div>
            ]
        );
    }

    selectPage = (pageNumber) => {
        this.setState({activePage: pageNumber});
        this.props.getNextPage(this.props.userId, pageNumber);
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
        getNextPage: (userId, page) => dispatch(invitationsActions.getInvitations(userId, page)),
        acceptInvitation: (id) => dispatch(invitationsActions.acceptInvitation(id)),
        declineInvitation: (id) => dispatch(invitationsActions.declineInvitation(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InvitationsList);