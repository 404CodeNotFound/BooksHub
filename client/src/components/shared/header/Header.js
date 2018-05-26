import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import $ from 'jquery';
import * as usersActions from '../../../actions/users.actions';

class Header extends Component {
    state = {
        links: ['active-item', '', '', '', '', ''],
        isMobile: false
    };

    render() {
        return (
            <header role="banner" className="header-absolute">
                <nav className="background-transparent background-primary-dott full-width sticky">
                    <div className="top-nav">
                        <div className="logo hide-l hide-xl hide-xxl">
                            <Link to="/" className="logo">
                                <img className="logo-white" src="../img/book-logo-white.png" alt="book-logo" />
                                <img className="logo-dark" src="../img/book-logo.png" alt="book-logo" />
                            </Link>
                        </div>
                        <p className="nav-text" onClick={this.changeNavigationVisibility}></p>

                        <div className="top-nav left-menu">
                            <ul className={"right top-ul chevron " + (this.state.isMobile ? 'show-menu' : '')}>
                                <li className={this.state.links[0]}>
                                    <Link to="/" onClick={() => this.changeActiveLink(0)}>Home</Link>
                                </li>
                                <li>
                                    <NavLink exact to="/books" activeClassName="active-item">Books</NavLink>
                                </li>
                                <li>
                                    <NavLink exact to="/events" activeClassName="active-item">Events</NavLink>
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
                            <ul className={"top-ul chevron " + (this.state.isMobile ? 'show-menu' : '')}>
                                <li className={this.state.links[3]}>
                                    <Link to="/search" onClick={() => this.changeActiveLink(3)}>Search</Link>
                                </li>
                                <li>
                                    {!this.props.currentUser ?
                                        <NavLink exact to="/login" activeClassName="active-item">Log in</NavLink> :
                                        (this.props.currentUserRole === 'Admin' ?
                                            <NavLink exact to="/administration/books" activeClassName="active-item">Admin Panel</NavLink> :
                                            <NavLink exact to={"/users/" + this.props.currentUser + "/profile"} activeClassName="active-item">My Profile</NavLink>
                                        )
                                    }
                                </li>
                                <li>
                                    {!this.props.currentUser ?
                                        <NavLink exact to="/register" activeClassName="active-item">Register</NavLink> :
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

    changeNavigationVisibility = () => {
        this.setState({ ...this.state, isMobile: !this.state.isMobile });
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

$('.nav-text').click(function () {
    console.log('navigation')
    $('.top-nav > ul').toggleClass('show-menu', 'fast');
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);