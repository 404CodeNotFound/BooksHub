import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as eventsActions from '../../actions/events.actions';
import * as usersActions from '../../actions/users.actions';
import * as booksActions from '../../actions/books.actions';
import EventsResultPage from '../search/EventsResultPartial';
import UsersResultPage from '../search/UsersResultPartial';
import BooksResultPage from '../search/BooksResultPartial';
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
            searchValue: '',
            showBooksResults: false,
            showEventsResults: false,
            showUsersResults: false,           
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
                                            <input type="text" className="input" id="search-input-field" value={this.state.searchValue} onChange={this.handleSearchChange} onKeyPress={this.handleKeyPress} />
                                        </div>
                                        <div className="search-submit" onClick={this.handleSearch}>
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
                        {this.state.showBooksResults &&
                            <BooksResultPage books={this.props.books} searchValue={this.state.searchValue} search={this.props.searchBook} />
                        }

                        {this.state.showEventsResults &&
                            <EventsResultPage events={this.props.events} searchValue={this.state.searchValue} search={this.props.searchEvent} />
                        }

                        {this.state.showUsersResults &&
                            <UsersResultPage users={this.props.users} />
                        }
                    </div>
                </section>
            </div>
        )
    }

    handleSearchItemChange = (event) => {
        this.setState({
            searchItem: event.target.value,
            showBooksResults: false,
            showEventsResults: false,
            showUsersResults: false,
        });
    }

    handleSearchChange = (event) => {
        this.setState({
            searchValue: event.target.value,
        });
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleSearch(event);
        }
    }

    handleSearch = (event) => {
        if (this.state.searchItem === searchItems.BOOKS && this.state.searchValue) {
            this.setState({
                showBooksResults: true,
            });

            this.props.searchBook(this.state.searchValue, this.props.searchBooksBy);
        } else if (this.state.searchItem === searchItems.EVENTS && this.state.searchValue) {
            this.setState({
                showEventsResults: true,
            });

            this.props.searchEvent(this.state.searchValue);
        } else if (this.state.searchItem === searchItems.USERS && this.state.searchValue) {
            this.setState({
                showUsersResults: true,
            });

            this.props.searchUser(this.state.searchValue);
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        events: state.search.events,
        users: state.search.users,
        books: state.search.books,
        searchBooksBy: state.search.searchBooks
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        searchEvent: (searchValue, filters) => dispatch(eventsActions.searchEvent(searchValue, filters)),
        searchUser: (searchValue) => dispatch(usersActions.searchUser(searchValue)),
        searchBook: (searchValue, searchType, filters) => dispatch(booksActions.searchBooks(searchValue, searchType, filters)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);