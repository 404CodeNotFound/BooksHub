import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as genresActions from '../../actions/genres.actions';
import * as constants from '../../utils/constants';

class BooksResultPartial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: new Set(),
            searchType: constants.SEARCH_BOOK_BY_TITLE
        };
    }

    componentDidMount() {
        this.props.getAllGenres();        
    }

    render() {
        return (
            <div className="panel container" id="search-results-books">
                <div className="row">
                    <div className="col-md-3 filters">
                        <div className="filter">
                            <div className="row">
                                <h4>Filter by Genre:</h4>
                            </div>
                            {this.props.genres.map(genre => 
                                <div key={genre._id} className="row checkbox checkbox-success">
                                    <input id={genre.name} type="checkbox" name="genre" value={genre.name} onChange={this.handleFilterChange} />
                                    <label htmlFor={genre.name}>
                                        {genre.name}
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="filter">
                            <div className="row">
                                <h4>Search by:</h4>
                            </div>
                            <div className="row">
                                <input id="title" type="radio" name="search-by" value={constants.SEARCH_BOOK_BY_TITLE} onChange={this.handleSearchTypeChange} />
                                <label htmlFor="title">
                                    Title
                                </label>
                            </div>
                            <div className="row">
                                <input id="author" type="radio" name="search-by" value={constants.SEARCH_BOOK_BY_AUTHOR} onChange={this.handleSearchTypeChange} />
                                <label htmlFor="author">
                                    Author
                                </label>
                            </div>
                            {/* <div className="row checkbox checkbox-success">
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
                            </div> */}
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="row">
                            {this.props.books.map(book =>
                                <div key={book._id} className="card col-md-3">
                                    <Link to={"/books/" + book._id}>
                                        <img width="100px" className="card-img-top" src={book.photo} alt={book.title} />
                                    </Link>
                                    <div className="card-block">
                                        <h5 className="card-title">
                                            <Link to={"/books/" + book._id}>{book.title}</Link>
                                        </h5>
                                        <p className="card-text">by
                                            <Link to={"/authors/" + book.author._id}>{book.author.first_name} {book.author.last_name}</Link>
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">Published on {book.date_published.split('T')[0]}</small>
                                        </p>
                                    </div>
                                </div>
                            )}
                                                        
                        </div>
                        {/* <div className="row">
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
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }

    handleFilterChange = (event) => {
        if (event.target.checked) {
            this.state.filters.add(event.target.value);
        } else {
            this.state.filters.delete(event.target.value);
        }

        if (this.props.searchValue) {
            this.props.search(this.props.searchValue, this.state.filters);
        }
    }

    handleSearchTypeChange = (event) => {
        console.log(event.target.value);
        if (event.target.checked) {
            this.setState({
                searchType: event.target.value
            });

            console.log(this.state.searchType);
            // this.props.search(this.props.searchValue, this.state.searchType, this.state.filters);
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        genres: state.administration.genres,        
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getAllGenres: () => dispatch(genresActions.getAllGenres()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksResultPartial);