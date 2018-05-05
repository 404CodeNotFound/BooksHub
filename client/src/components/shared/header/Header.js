import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import * as usersActions from '../../../actions/users.actions';

class Header extends Component {
    render() {
        return (
            <header role="banner" className="position-absolute">
                <nav className="background-transparent background-primary-dott full-width sticky">
                    <div className="top-nav">
                        <div className="logo hide-l hide-xl hide-xxl">
                            <Link to="/" className="logo">
                                <img className="logo-white" src="../img/book-logo-white.png" alt="book-logo" />
                                <img className="logo-dark" src="../img/book-logo.png" alt="book-logo" />
                            </Link>
                        </div>
                        <p className="nav-text"></p>

                        <div className="top-nav left-menu">
                            <ul className="right top-ul chevron">
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/books">Books</Link>
                                </li>
                                <li>
                                    <Link to="/events">Events</Link>
                                </li>
                            </ul>
                        </div>

                        <ul className="logo-menu">
                            <Link to="/" className="logo">
                                <img className="logo-white" src="../img/book-logo-white.png" alt="" />
                                <img className="logo-dark" src="../img/book-logo.png" alt="" />
                            </Link>
                        </ul>

                        <div className="top-nav right-menu">
                            <ul className="top-ul chevron">
                                <li>
                                    <Link to="/search">Search</Link>
                                </li>
                                <li>
                                    {!this.props.currentUser ?
                                        <Link to="/login">Log in</Link> :
                                        (this.props.currentUserRole === 'Admin' ?
                                            <Link to="/administration/books">Admin Panel</Link> :
                                            <Link to={"/users/" + this.props.currentUser + "/profile"}>My Profile</Link>
                                        )
                                    }
                                </li>
                                <li>
                                    {!this.props.currentUser ?
                                        <Link to="/register">Register</Link> :
                                        <Link to="/" onClick={this.props.logout}>Logout</Link>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }

}

function mapStateToProps(state, ownProps) {
    const currentUser = localStorage.getItem('username');
    const currentUserRole = localStorage.getItem('role');    
    return {
        currentUser: currentUser,
        currentUserRole: currentUserRole
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        logout: () => dispatch(usersActions.logout())
    };
}

$(window).scroll(function () {
    if ($(this).scrollTop() > 20) {
        $('.sticky').addClass("fixed");
    }
    else {
        $('.sticky').removeClass("fixed");
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);