import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../actions/users.actions';
import * as booksActions from '../../actions/books.actions';
import * as invitationsActions from '../../actions/invitations.actions';
import * as commentsActions from '../../actions/comments.actions';
import * as reviewsActions from '../../actions/reviews.actions';
import * as eventsActions from '../../actions/events.actions';
import Information from './profile-partials/Information';
import BooksList from './profile-partials/BooksList';
import EventsList from './profile-partials/EventsList';
import CommentsList from './profile-partials/CommentsList';
import FriendsList from './profile-partials/FriendsList';
import InvitationsList from './profile-partials/InvitationsList';
import '../../style/profile.css';

class ProfilePage extends Component {
    state = { links: ['active', '', '', '', '', '', '', '', '', ''] };
    render() {
        return (
            this.props.user !== null ?
                [<header key="profile-header" className="section background-image text-center">
                    <h1 className="animated-element slow text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-50 text-line-height-1 margin-bottom-30 margin-top-130">
                        {this.props.user.username === this.props.currentUser.username ?
                            <span>Hello, {this.props.user.first_name} {this.props.user.last_name}!</span> :
                            <span>{this.props.user.first_name} {this.props.user.last_name}</span>
                        }
                    </h1>
                    <img className="arrow-object" src="../img/arrow-object-white.svg" alt="arrow" />
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
                                        <button type="button" className="btn btn-main-green" data-toggle="modal" data-target="#edit-modal">Edit Profile</button> :
                                        (this.showInviteButton() &&
                                        (!this.props.hideInviteButton && 
                                            <button type="button" className="btn btn-main-green" onClick={this.sendInvitation}>Send Invitation</button> 
                                        )
                                        )
                                    }
                                </div>
                                <div className="widget user-dashboard-menu">
                                    <ul>
                                        <li className={this.state.links[0]} id="profile-info" onClick={this.changeContent}>
                                            <i className="fa fa-user"></i> Information
                                        </li>
                                        <li className={this.state.links[1]} id="currently-reading-link" onClick={this.changeContent}>
                                            <i className="fa fa-book"></i> Currently reading
                                        </li>
                                        <li className={this.state.links[2]} id="want-to-read-link" onClick={this.changeContent}>
                                            <i className="fa fa-bookmark-o"></i> Want to read
                                        </li>
                                        <li className={this.state.links[3]} id="read-link" onClick={this.changeContent}>
                                            <i className="fa fa-file-archive-o"></i> Read
                                        </li>
                                        <li className={this.state.links[4]} id="my-events-link" onClick={this.changeContent}>
                                            <i className="fa fa-calendar"></i> {this.props.currentUser === this.props.user.username && <span>My</span>} Events
                                        </li>
                                        <li className={this.state.links[5]} id="joined-events-link" onClick={this.changeContent}>
                                            <i className="fa fa-bookmark-o"></i> Joined Events
                                        </li>
                                        <li className={this.state.links[6]} id="reviews-link" onClick={this.changeContent}>
                                            <i className="fa fa-comments"></i>{this.props.currentUser === this.props.user.username && <span>My</span>} Reviews
                                        </li>
                                        <li className={this.state.links[7]} id="comments-link" onClick={this.changeContent}>
                                            <i className="fa fa-comments"></i>{this.props.currentUser === this.props.user.username && <span>My</span>} Comments
                                        </li>
                                        <li className={this.state.links[8]} id="friends-link" onClick={this.changeContent}>
                                            <i className="fa fa-users"></i>{this.props.currentUser === this.props.user.username && <span>My</span>} Friends
                                        </li>
                                        {this.props.currentUser.username === this.props.user.username &&
                                            <li className={this.state.links[9]} id="invitations-link" onClick={this.changeContent}>
                                                <i className="fa fa-user"></i>Pending invitations
                                        </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            {this.state.links[0] === 'active' &&
                                <Information user={this.props.user} />
                            }
                            {this.state.links[1] === 'active' &&
                                <BooksList books={this.props.currentlyReading} title="Currently Reading Collection" />
                            }
                            {this.state.links[2] === 'active' &&
                                <BooksList books={this.props.wantToRead} title="Want to Read Collection" />
                            }
                            {this.state.links[3] === 'active' &&
                                <BooksList books={this.props.read} title="Read Books Collection" />
                            }
                            {this.state.links[4] === 'active' &&
                                <EventsList events={this.props.events} title="Events Collection"
                                    isMyProfile={this.props.user.username === this.props.currentUser} />
                            }
                            {this.state.links[5] === 'active' &&
                                <EventsList events={this.props.joinedEvents} title="Joined Events Collection"
                                    isMyProfile={false} />
                            }
                            {this.state.links[6] === 'active' &&
                                <CommentsList comments={this.props.reviews} title="Reviews Collection"
                                    isMyProfile={this.props.user.username === this.props.currentUser} />
                            }
                            {this.state.links[7] === 'active' &&
                                <CommentsList comments={this.props.comments} title="Comments Collection"
                                    isMyProfile={this.props.user.username === this.props.currentUser} />
                            }
                            {this.state.links[8] === 'active' &&
                                <FriendsList users={this.props.friends} title="Friends Collection" />
                            }
                            {this.state.links[9] === 'active' &&
                                <InvitationsList invitations={this.props.invitations} title="Pending Invitations Collection" />
                            }
                        </div>
                    </div>
                </section>
                ] :
                <div className="loader"></div>
        )
    }

    changeContent = (event) => {
        switch (event.target.id) {
            case 'currently-reading-link':
                this.setState({ links: ['', 'active', '', '', '', '', '', '', '', ''] });
                this.props.getCurrentlyReadingBooks(this.props.user._id);
                break;
            case 'want-to-read-link':
                this.setState({ links: ['', '', 'active', '', '', '', '', '', '', ''] });
                this.props.getWantToReadBooks(this.props.user._id);
                break;
            case 'read-link':
                this.setState({ links: ['', '', '', 'active', '', '', '', '', '', ''] });
                this.props.getReadBooks(this.props.user._id);
                break;
            case 'my-events-link':
                this.setState({ links: ['', '', '', '', 'active', '', '', '', '', ''] });
                this.props.getUserEvents(this.props.user._id);
                break;
            case 'joined-events-link':
                this.setState({ links: ['', '', '', '', '', 'active', '', '', '', ''] });
                this.props.getJoinedEvents(this.props.user._id);
                break;
            case 'reviews-link':
                this.setState({ links: ['', '', '', '', '', '', 'active', '', '', ''] });
                this.props.getReviews(this.props.user._id);
                break;
            case 'comments-link':
                this.setState({ links: ['', '', '', '', '', '', '', 'active', '', ''] });
                this.props.getComments(this.props.user._id);
                break;
            case 'friends-link':
                this.setState({ links: ['', '', '', '', '', '', '', '', 'active', ''] });
                this.props.getFriends(this.props.user._id);
                break;
            case 'invitations-link':
                this.setState({ links: ['', '', '', '', '', '', '', '', '', 'active'] });
                this.props.getInvitations(this.props.user._id);
                break;
            default:
                this.setState({ links: ['active', '', '', '', '', '', '', '', '', ''] });
                break;
        }
    };

    sendInvitation = () => {
        const senderId = localStorage.getItem('id');
        const receiverId = this.props.user._id;

        this.props.sendInvitation(senderId, receiverId);
    }

    showInviteButton = () => {
        const friendIndex = this.props.user.friends.findIndex(friend => friend === this.props.currentUser.id);
        const requestIndex = this.props.user.requests.findIndex(request => request.sender === this.props.currentUser.id);
        if(friendIndex >= 0 || requestIndex >= 0) {
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
        currentUser: {username: username, id: userId},
        currentlyReading: state.users.currentlyReading,
        read: state.users.read,
        wantToRead: state.users.wantToRead,
        friends: state.users.friends,
        invitations: state.users.invitations,
        comments: state.users.comments,
        reviews: state.users.reviews,
        events: state.users.events,
        joinedEvents: state.users.joinedEvents,
        hideInviteButton: state.invitations.hideInviteButton
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getProfile: dispatch(usersActions.getProfile(ownProps.match.params.username)),
        getCurrentlyReadingBooks: (id) => dispatch(booksActions.getCurrentlyReadingBooks(id)),
        getWantToReadBooks: (id) => dispatch(booksActions.getWantToReadBooks(id)),
        getReadBooks: (id) => dispatch(booksActions.getReadBooks(id)),
        getFriends: (id) => dispatch(usersActions.getFriends(id)),
        getInvitations: (id) => dispatch(invitationsActions.getInvitations(id)),
        getComments: (id) => dispatch(commentsActions.getUserComments(id)),
        getReviews: (id) => dispatch(reviewsActions.getUserReviews(id)),
        getUserEvents: (id) => dispatch(eventsActions.getUserEvents(id)),
        getJoinedEvents: (id) => dispatch(eventsActions.getJoinedEvents(id)),
        sendInvitation: (senderId, receiverId) => dispatch(invitationsActions.sendInvitation(senderId, receiverId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);