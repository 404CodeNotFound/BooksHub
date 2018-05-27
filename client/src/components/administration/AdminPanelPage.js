import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AllBooksList from './books/AllBooksList';
import AllAuthorsList from './authors/AllAuthorsList';
import AllGenresList from './genres/AllGenresList';
import AllUsersList from './users/AllUsersList';
import AllEventsList from './events/AllEventsList';
import '../../style/admin.panel.css';

class AdminPanelPage extends Component {
    state = { links: ['active', '', '', '', ''] };
    render() {
        return (
                <article>
                    <header className="section background-image text-center">
                        <h1 className="animated-element slow text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-50 text-line-height-1 margin-bottom-30 margin-top-130">
                            Admin Panel
                        </h1>
                        <img className="arrow-object" src="../img/arrow-object-white.svg" alt="arrow" />
                    </header>
                        <section className="section background-white">
                        <div className="container" id="admin-page-content">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="sidebar">
                                        <div className="widget user-dashboard-menu">
                                            <ul id="admin-menu">
                                                <li className={this.state.links[0]} id="profile-info">
                                                    <Link to="/administration/books" onClick={(event) => this.setActive(0)}>
                                                    <i className="fa fa-book"></i> Books
                                                </Link>
                                                </li>
                                                <li className={this.state.links[1]} id="currently-reading-link">
                                                    <Link to="/administration/events" onClick={(event) => this.setActive(1)}>
                                                    <i className="fa fa-calendar"></i> Events
                                                </Link>
                                                </li>
                                                <li className={this.state.links[2]} id="want-to-read-link">
                                                    <Link to="/administration/users" onClick={(event) => this.setActive(2)}>
                                                        <i className="fa fa-users"></i> Users
                                                </Link>
                                                </li>
                                                <li className={this.state.links[3]} id="read-link">
                                                    <Link to="/administration/authors" onClick={(event) => this.setActive(3)}>
                                                        <i className="fa fa-users"></i> Authors
                                                </Link>
                                                </li>
                                                <li className={this.state.links[4]} id="my-events-link" >
                                                    <Link to="/administration/genres" onClick={(event) => this.setActive(4)}>
                                                    <i className="fa fa-bookmark"></i> Genres
                                                </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="line col-md-9">
                                    <Route path="/administration/books" render={() => <AllBooksList />} />
                                    <Route path="/administration/authors" render={() => <AllAuthorsList />} />
                                    <Route path="/administration/genres" render={() => <AllGenresList />} />
                                    <Route path="/administration/users" render={() => <AllUsersList />} /> 
                                    <Route path="/administration/events" render={() => <AllEventsList />}/>
                                </div>
                            </div>
                        </div>
                    </section >
                </article>
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
}

function mapStateToProps(state, ownProps) {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('id');

    return {
        currentAdmin: { username: username, id: userId }
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanelPage);