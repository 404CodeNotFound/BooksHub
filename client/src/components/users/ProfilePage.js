import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/users.actions';
import * as invitationsActions from '../../actions/invitations.actions';
import Information from './profile-partials/Information';
import BooksList from './profile-partials/BooksList';
import EventsList from './profile-partials/EventsList';
import CommentsList from './profile-partials/CommentsList';
import FriendsList from './profile-partials/FriendsList';
import InvitationsList from './profile-partials/InvitationsList';
import ReviewsList from './profile-partials/ReviewsList';
import EditUserModal from './common/EditUserModal';
import * as modalsActions from '../../actions/modals.actions';
import { BarLoader } from 'react-css-loaders';
import '../../style/profile.css';

class ProfilePage extends Component {
    state = { links: ['active', '', '', '', '', '', '', '', '', '', ''], isOpen: false };

    render() {
        return (
            this.props.user === null ?
                <div className="loader-page">
                    <BarLoader color="#4eb980" size="11" />
                </div> :
                [<header key="profile-header" className="section background-image text-center">
                    <h1 className="animated-element slow text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-50 text-line-height-1 margin-bottom-30 margin-top-130">
                        {this.props.user.username === this.props.currentUser.username ?
                            <span>Hello, {this.props.user.first_name} {this.props.user.last_name}!</span> :
                            <span>{this.props.user.first_name} {this.props.user.last_name}</span>
                        }
                    </h1>
                    <img className="arrow-object" src="../../img/arrow-object-white.svg" alt="arrow" />
                </header>,
                <section key="profile-section" className="background-white dashboard section">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="sidebar">
                                <div className="widget user-dashboard-profile">
                                    <div className="profile-thumb text-center">
                                        <img src={this.props.user.photo} className="rounded-circle" alt="user-avatar" />
                                    </div>
                                    <h5 className="text-center">{this.props.user.first_name} {this.props.user.last_name}</h5>
                                    <p>{this.props.user.username}</p>
                                    {this.props.currentUser.username === this.props.user.username ?
                                        <button type="button" className="btn btn-main-green" onClick={() => this.props.openEditUserModal(this.props.user)}>Edit Profile</button> :
                                        (this.showInviteButton() &&
                                            (!this.props.hideInviteButton &&
                                                <button type="button" className="btn btn-main-green" onClick={this.sendInvitation}>Send Invitation</button>
                                            )
                                        )
                                    }
                                </div>
                                <div className="widget user-dashboard-menu">
                                    <ul id="profile-menu">
                                        <li className={this.state.links[0]} id="profile-info">
                                            <Link to={"/users/" + this.props.user.username + "/profile"} onClick={(event) => this.setActive(0)}>
                                                <i className="fa fa-user"></i> Information
                                                </Link>
                                        </li>
                                        <li className={this.state.links[1]} id="currently-reading-link">
                                            <Link to={"/users/" + this.props.user.username + "/currently-reading"} onClick={(event) => this.setActive(1)}>
                                                <i className="fa fa-book"></i> Currently reading
                                                </Link>
                                        </li>
                                        <li className={this.state.links[2]} id="want-to-read-link">
                                            <Link to={"/users/" + this.props.user.username + "/wishlist"} onClick={(event) => this.setActive(2)}>
                                                <i className="fa fa-bookmark-o"></i> Want to read
                                                </Link>
                                        </li>
                                        <li className={this.state.links[3]} id="read-link">
                                            <Link to={"/users/" + this.props.user.username + "/read"} onClick={(event) => this.setActive(3)}>
                                                <i className="fa fa-file-archive-o"></i> Read
                                                </Link>
                                        </li>
                                        {this.props.currentUser.username === this.props.user.username &&
                                            <li className={this.state.links[4]} id="read-link">
                                                <Link to={"/users/" + this.props.user.username + "/recommended"} onClick={(event) => this.setActive(4)}>
                                                    <i className="fa fa-file-archive-o"></i> Recommended books <span className="badge badge-light">{this.props.user.recommended_books.length}</span>
                                                </Link>
                                            </li>
                                        }
                                        <li className={this.state.links[5]} id="my-events-link" >
                                            <Link to={"/users/" + this.props.user.username + "/events"} onClick={(event) => this.setActive(5)}>
                                                <i className="fa fa-calendar"></i> Events
                                                </Link>
                                        </li>
                                        <li className={this.state.links[6]} id="joined-events-link">
                                            <Link to={"/users/" + this.props.user.username + "/joined-events"} onClick={(event) => this.setActive(6)}>
                                                <i className="fa fa-bookmark-o"></i> Joined Events
                                                </Link>
                                        </li>
                                        <li className={this.state.links[7]} id="reviews-link">
                                            <Link to={"/users/" + this.props.user.username + "/reviews"} onClick={(event) => this.setActive(7)}>
                                                <i className="fa fa-comments"></i> Reviews
                                                </Link>
                                        </li>
                                        <li className={this.state.links[8]} id="comments-link">
                                            <Link to={"/users/" + this.props.user.username + "/comments"} onClick={(event) => this.setActive(8)}>
                                                <i className="fa fa-comments"></i> Comments
                                                </Link>
                                        </li>
                                        <li className={this.state.links[9]} id="friends-link">
                                            <Link to={"/users/" + this.props.user.username + "/friends"} onClick={(event) => this.setActive(9)}>
                                                <i className="fa fa-users"></i> Friends
                                            </Link>
                                        </li>
                                        {this.props.currentUser.username === this.props.user.username &&
                                            <li className={this.state.links[10]} id="invitations-link">
                                                <Link to={"/users/" + this.props.user.username + "/invitations"} onClick={(event) => this.setActive(10)}>
                                                    <i className="fa fa-user"></i> Pending invitations <span className="badge badge-light">{this.props.user.requests.length}</span>
                                                </Link>
                                            </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 offset-md-1">
                            <Route path={"/users/" + this.props.user.username + "/profile"} render={() => <Information user={this.props.user} />} />
                            <Route path={"/users/" + this.props.user.username + "/currently-reading"}
                                render={() => <BooksList title="Currently Reading Collection" userId={this.props.user._id} />} />
                            <Route path={"/users/" + this.props.user.username + "/wishlist"}
                                render={() => <BooksList title="Want to Read Collection" userId={this.props.user._id} />} />
                            <Route path={"/users/" + this.props.user.username + "/read"}
                                render={() => <BooksList title="Read Books Collection" userId={this.props.user._id} />} />
                            <Route path={"/users/" + this.props.user.username + "/recommended"}
                                render={() => <BooksList title="Your friends recommend you..." userId={this.props.user._id} />} />
                            <Route path={"/users/" + this.props.user.username + "/events"}
                                render={() => <EventsList title="Events Collection" userId={this.props.user._id} />} />
                            <Route path={"/users/" + this.props.user.username + "/joined-events"}
                                render={() => <EventsList title="Joined Events Collection" userId={this.props.user._id} />} />
                            <Route path={"/users/" + this.props.user.username + "/reviews"}
                                render={() => <ReviewsList userId={this.props.user._id}
                                    title="Reviews Collection" isMyProfile={this.props.user.username === this.props.currentUser.username} />} />
                            <Route path={"/users/" + this.props.user.username + "/comments"}
                                render={() => <CommentsList userId={this.props.user._id}
                                    title="Comments Collection" isMyProfile={this.props.user.username === this.props.currentUser.username} />} />
                            <Route path={"/users/" + this.props.user.username + "/friends"}
                                render={() => <FriendsList userId={this.props.user._id}
                                    title="Friends Collection" />} />
                            <Route path={"/users/" + this.props.user.username + "/invitations"}
                                render={() => <InvitationsList userId={this.props.user._id}
                                    title="Pending Invitations Collection" />} />
                        </div>
                    </div>
                    {this.props.isVisibleEditUserModal &&
                        <EditUserModal />
                    }
                </section >
                ]
        )
    }

    setActive = (index) => {
        let changedLinks = [];
        for (let i = 0; i < 10; i++) {
            if (i === index) {
                changedLinks[i] = 'active';
            } else {
                changedLinks[i] = '';
            }
        }

        this.setState({ links: changedLinks });
    }

    sendInvitation = () => {
        const receiverId = this.props.user._id;

        this.props.sendInvitation(receiverId);
    }

    showInviteButton = () => {
        const friendIndex = this.props.user.friends.findIndex(friend => friend === this.props.currentUser.id);
        const requestIndex = this.props.user.requests.findIndex(request => request.sender === this.props.currentUser.id);
        if (friendIndex >= 0 || requestIndex >= 0) {
            return false;
        }

        return true;
    }
}

function mapStateToProps(state, ownProps) {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('id');

    return {
        user: state.users.profile,
        currentUser: { username: username, id: userId },
        hideInviteButton: state.invitations.hideInviteButton,
        isVisibleEditUserModal: state.modals.showEditUserModal,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getProfile: dispatch(usersActions.getProfile(ownProps.match.params.username)),
        sendInvitation: (receiverId) => dispatch(invitationsActions.sendInvitation(receiverId)),
        openEditUserModal: (user) => dispatch(modalsActions.openEditUserModal(user))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);