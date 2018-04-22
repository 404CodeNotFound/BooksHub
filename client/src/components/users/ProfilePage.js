import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as usersActions from '../../actions/users.actions';
import '../../style/profile.css';

class ProfilePage extends Component {
    render() {
        return (
            this.props.user !== null ?
                [<header key="profile-header" className="section background-image text-center">
                    <h1 className="animated-element slow text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-50 text-line-height-1 margin-bottom-30 margin-top-130">
                        {this.props.user.username === this.props.currentUser ?
                            <span>Hello, {this.props.user.first_name} {this.props.user.last_name}!</span> :
                            <span>{this.props.user.first_name} {this.props.user.last_name}</span>
                        }
                    </h1>
                    <img className="arrow-object" src="img/arrow-object-white.svg" alt="arrow" />
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
                                    {this.props.currentUser === this.props.user.username &&
                                        <button type="button" className="btn btn-main-green" data-toggle="modal" data-target="#edit-modal">Edit Profile</button>
                                    }
                                </div>
                                <div className="widget user-dashboard-menu">
                                    <ul>
                                        <li className="active" id="profile-info">
                                            <i className="fa fa-user"></i> Information
                                        </li>
                                        <li id="currently-reading-link" onClick={this.changeContent}>
                                            <i className="fa fa-book"></i> Currently reading
                                        </li>
                                        <li id="want-to-read-link">
                                            <i className="fa fa-bookmark-o"></i> Want to read
                                        </li>
                                        <li id="read-link">
                                            <i className="fa fa-file-archive-o"></i> Read
                                        </li>
                                        <li id="my-events-link">
                                            <i className="fa fa-calendar"></i> {this.props.currentUser === this.props.user.username && <span>My</span>} Events
                                        </li>
                                        <li id="joined-events-link">
                                            <i className="fa fa-bookmark-o"></i> Joined Events
                                        </li>
                                        <li id="reviews-link">
                                            <i className="fa fa-comments"></i>{this.props.currentUser === this.props.user.username && <span>My</span>} Reviews
                                        </li>
                                        <li id="comments-link">
                                            <i className="fa fa-comments"></i>{this.props.currentUser === this.props.user.username && <span>My</span>} Comments
                                        </li>
                                        <li id="friends-link">
                                            <i className="fa fa-users"></i>{this.props.currentUser === this.props.user.username && <span>My</span>} Friends
                                        </li>
                                        {this.props.currentUser === this.props.user.username &&
                                            <li id="invitations-link">
                                                <i className="fa fa-user"></i>Pending invitations
                                        </li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <dl className="user-info dl-horizontal">
                                <dt>
                                    E-mail
                                    </dt>

                                <dd>
                                    {this.props.user.email}
                                </dd>

                                <dt>
                                    Nationality
                                </dt>
                                <dd>
                                    {this.props.user.nationality}
                                </dd>
                                <dt>
                                    Gender
                                    </dt>

                                <dd>
                                    {this.props.user.gender}
                                </dd>

                                <dt>
                                    Birthdate
                                </dt>

                                <dd>
                                    {this.props.user.birth_date}
                                </dd>



                                <dt>
                                    Age
                                    </dt>

                                <dd>
                                    {this.props.age}
                                </dd>
                                <dt>
                                    Languages
                                    </dt>

                                <dd>
                                    {this.props.user.languages.map(language => 
                                        <p key={language}>{language}</p>
                                    )}
                                </dd>
                                <dt>
                                    Favourite Quote
                                    </dt>

                                <dd>
                                    {this.props.user.favourite_quote}
                                </dd>
                                <dt>
                                    Favourite Genres
                                    </dt>

                                <dd>
                                    {this.props.user.favourite_genres.map( genre => 
                                        <p key={genre}>{genre}</p>
                                    )}
                                </dd>
                            </dl>
                        </div>
                    </div>
                </section>
                ] :
                <div className="loader"></div>
        )
    }

    changeContent = (event) => {
        console.log(event);
    };
}

function mapStateToProps(state, ownProps) {
    const username = localStorage.getItem('username');
    return {
        user: state.users.profile,
        currentUser: username
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getProfile: dispatch(usersActions.getProfile(ownProps.match.params.username))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);