import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as eventsActions from '../../actions/events.actions';
import EventsResultPage from '../search/EventsResultPartial';
import '../../style/search.css';

const searchItems = {
    BOOKS: "Books",
    EVENTS: "Events",
    USERS: "Users",    
};

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchItem: searchItems.BOOKS,
            searchValue: ''
        };
    }

    render() {
        return (
            <div>
                <header className="section background-image text-center">
                    <div className="search-panel" id="banner">
                        <div className="container col-md-6 col-md-offset-2 col-sm-12" id="search-form">
                            <div className="row search-input-options">
                                <div className="search-form">
                                    <div className="row">
                                        <div className="search-input">
                                            <input type="text" className="input" id="search-input-field" value={this.state.searchValue} onChange={this.handleSearchChange} autoFocus />
                                        </div>
                                        <div className="search-submit">
                                            <i className="fa fa-search" id="btn-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="options" data-toggle="buttons">
                                    <label className="btn">
                                        <input type="radio" name="searchItem" value="Books" id='books-category' onChange={this.handleSearchItemChange} checked={this.state.searchItem === searchItems.BOOKS} />
                                        <span className="icon">
                                            <i className="fa fa-book"></i>
                                        </span>
                                        <span>
                                            <small>BOOKS</small>
                                        </span>
                                    </label>
                                    <label className="btn">
                                        <input type="radio" name="searchItem" value="Events" id='events-category' onChange={this.handleSearchItemChange} checked={this.state.searchItem === searchItems.EVENTS} />
                                        <span className="icon">
                                            <i className="fa fa-calendar"></i>
                                        </span>
                                        <span>
                                            <small>EVENTS</small>
                                        </span>
                                    </label>
                                    <label className="btn">
                                        <input type="radio" name="searchItem" value="Users" id='users-category' onChange={this.handleSearchItemChange} checked={this.state.searchItem === searchItems.USERS} />
                                        <span className="icon">
                                            <i className="fa fa-users"></i>
                                        </span>
                                        <span>
                                            <small>USERS</small>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img className="arrow-object" src="img/arrow-object-dark.svg" alt="" />
                </header>

                <section className="full-width background-white text-center" id="results">
                    <div className="margin2x">
                        <div className="panel container" id="search-results-books">
                            <div className="row">
                                <div className="col-md-3 filters">
                                    <div className="filter">
                                        <div className="row">
                                            <h4>Filter by Genre:</h4>
                                        </div>
                                        <div className="row checkbox checkbox-success">
                                            <input id="mystery" type="checkbox" />
                                            <label htmlFor="mystery">
                                                Mystery
                                            </label>
                                        </div>
                                        <div className="row checkbox checkbox-success">
                                            <input id="romance" type="checkbox" />
                                            <label htmlFor="romance">
                                                Romance
                                            </label>
                                        </div>
                                        <div className="row checkbox checkbox-success">
                                            <input id="thriller" type="checkbox" />
                                            <label htmlFor="thriller">
                                                Thriller
                                            </label>
                                        </div>
                                        <div className="row checkbox checkbox-success">
                                            <input id="dramma" type="checkbox" />
                                            <label htmlFor="dramma">
                                                Dramma
                                            </label>
                                        </div>
                                    </div>
                                    <div className="filter">
                                        <div className="row">
                                            <h4>Search by:</h4>
                                        </div>
                                        <div className="row checkbox checkbox-success">
                                            <input id="title" type="checkbox" />
                                            <label htmlFor="title">
                                                Title
                                            </label>
                                        </div>
                                        <div className="row checkbox checkbox-success">
                                            <input id="author" type="checkbox" />
                                            <label htmlFor="author">
                                                Author
                                            </label>
                                        </div>
                                        <div className="row checkbox checkbox-success">
                                            <input id="language" type="checkbox" />
                                            <label htmlFor="language">
                                                Language
                                            </label>
                                        </div>
                                        <div className="row checkbox checkbox-success">
                                            <input id="summary" type="checkbox" />
                                            <label htmlFor="summary">
                                                Summary
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="card col-md-3">
                                            <a href="book.html">
                                                <img width="100px" className="card-img-top" src="https://images.gr-assets.com/books/1437916050l/26506.jpg" alt="Card image cap" />
                                            </a>
                                            <div className="card-block">
                                                <h5 className="card-title">
                                                    <a href="book.html">Sisters</a>
                                                </h5>
                                                <p className="card-text">by
                                                    <a href="author.html">Danielle Steel</a>
                                                </p>
                                                <p className="card-text">
                                                    <small className="text-muted">Published on 2018.03.23</small>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="card col-md-3">
                                            <a href="book.html">
                                                <img width="100px" className="card-img-top" src="https://panmacmillan.azureedge.net/pml/panmacmillancorporatesite/media/panmacmillan/cover-images/lucy-diamond/__thumbnails/9781509815661one%20night%20in%20italy_6_jpg_264_400.jpg" alt="Card image cap" />
                                            </a>
                                            <div className="card-block">
                                                <h5 className="card-title">
                                                    <a href="book.html">One night in Italy</a>
                                                </h5>
                                                <p className="card-text">by
                                                    <a href="author.html">Lucy Diamond</a>
                                                </p>
                                                <p className="card-text">
                                                    <small className="text-muted">Published on 2018.03.23</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
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
                            </div>

                        </div>

                        {this.props.events.length > 0 &&
                        <EventsResultPage events={this.props.events} />
                        }

                        <div className="panel container" id="search-results-users">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3>Found users</h3>
                                    <div className="users">
                                        <div className="row">
                                            <div className="col-md-2 col-sm-4 col-xs-2 text-center">
                                                <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" className="img-circle" alt="image" styles="width: 70px;" />
                                                <p>
                                                    <a href="profile.html">user</a>
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-xs-2 text-center">
                                                <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" className="img-circle" alt="image" styles="width: 70px;" />
                                                <p>
                                                    <a href="profile.html">user1</a>
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-xs-2 text-center">
                                                <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" className="img-circle" alt="image" styles="width: 70px;" />
                                                <p>
                                                    <a href="profile.html">user2</a>
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-xs-2 text-center">
                                                <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" className="img-circle" alt="image" styles="width: 70px;" />
                                                <p>
                                                    <a href="profile.html">user3</a>
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-xs-2 text-center">
                                                <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" className="img-circle" alt="image" styles="width: 70px;" />
                                                <p>
                                                    <a href="profile.html">user4</a>
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-xs-2 text-center">
                                                <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" className="img-circle" alt="image" styles="width: 70px;" />
                                                <p>
                                                    <a href="profile.html">user5</a>
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-xs-2 text-center">
                                                <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" className="img-circle" alt="image" styles="width: 70px;" />
                                                <p>
                                                    <a href="profile.html">user6</a>
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-xs-2 text-center">
                                                <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" className="img-circle" alt="image" styles="width: 70px;" />
                                                <p>
                                                    <a href="profile.html">user7</a>
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-xs-2 text-center">
                                                <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" className="img-circle" alt="image" styles="width: 70px;" />
                                                <p>
                                                    <a href="profile.html">user8</a>
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-xs-2 text-center">
                                                <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" className="img-circle" alt="image" styles="width: 70px;" />
                                                <p>
                                                    <a href="profile.html">user9</a>
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-xs-2 text-center">
                                                <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" className="img-circle" alt="image" styles="width: 70px;" />
                                                <p>
                                                    <a href="profile.html">user10</a>
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-xs-2 text-center">
                                                <img src="https://en.opensuse.org/images/0/0b/Icon-user.png" className="img-circle" alt="image" styles="width: 70px;" />
                                                <p>
                                                    <a href="profile.html">user11</a>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    handleSearchItemChange = (event) => {
        this.setState({
            searchItem: event.target.value
        });
    }

    handleSearchChange = (event) => {
        this.setState({
            searchValue: event.target.value
        });

        if (this.state.searchItem === searchItems.BOOKS) {

        } else if (this.state.searchItem === searchItems.EVENTS && this.state.searchValue) {
            this.props.searchEvent(this.state.searchValue);
        } else if (this.state.searchItem === searchItems.USERS) {

        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        events: state.search.events,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        searchEvent: (searchValue) => dispatch(eventsActions.searchEvent(searchValue))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);