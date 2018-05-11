import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import * as usersActions from '../../../actions/users.actions';

class Header extends Component {
    state = {
        links:['active-item', '', '', '', '', '']
    };

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
                                <li className={this.state.links[0]}>
                                    <Link to="/" onClick={() => this.changeActiveLink(0)}>Home</Link>
                                </li>
                                <li className={this.state.links[1]}>
                                    <Link to="/books" onClick={() => this.changeActiveLink(1)}>Books</Link>
                                </li>
                                <li className={this.state.links[2]}>
                                    <Link to="/events" onClick={() => this.changeActiveLink(2)}>Events</Link>
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
                                <li className={this.state.links[3]}>
                                    <Link to="/search" onClick={() => this.changeActiveLink(3)}>Search</Link>
                                </li>
                                <li className={this.state.links[4]}>
                                    {!this.props.currentUser ?
                                        <Link to="/login" onClick={() => this.changeActiveLink(4)}>Log in</Link> :
                                        (this.props.currentUser.role === 'admin' ?
                                            <Link to="/administration" onClick={() => this.changeActiveLink(4)}>Admin Panel</Link> :
                                            <Link to={"/users/" + this.props.currentUser + "/profile"} onClick={() => this.changeActiveLink(4)}>My Profile</Link>
                                        )
                                    }
                                </li>
                                <li className={this.state.links[5]}>
                                    {!this.props.currentUser ?
                                        <Link to="/register" onClick={() => this.changeActiveLink(5)}>Register</Link> :
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

    changeActiveLink = (index) => {
        let changedLinks = [];
        for (let i = 0; i < 6; i++) {
            if (i === index) {
                changedLinks[i] = 'active-item';
            } else {
                changedLinks[i] = '';
            }
        }

        this.setState({ links: changedLinks });
    }
}

function mapStateToProps(state, ownProps) {
    const currentUser = localStorage.getItem('username');
    return {
        currentUser: currentUser
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