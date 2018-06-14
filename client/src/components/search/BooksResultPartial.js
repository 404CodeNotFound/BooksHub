import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as genresActions from '../../actions/genres.actions';
import * as booksActions from '../../actions/books.actions';
import * as constants from '../../utils/constants';

const LANGUAGES = [
	'Bulgarian',
	'English',
	'French',
	'Spanish',
	'German',
    'Italian',
];

class BooksResultPartial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: new Set(),
            searchType: constants.SEARCH_BOOK_BY_TITLE,
            languageFilters: new Set(),
        };
    }

    componentDidMount() {
        this.props.getAllGenres();
        this.props.updateSearchType(constants.SEARCH_BOOK_BY_TITLE);
    }

    render() {
        return (
            <div className="panel container" id="search-results-books">
                <div className="row">
                    <div className="col-md-3 filters">
                        <div className="filter">
                            <div className="row">
                                <h4>Search by:</h4>
                            </div>
                            <div className={"row radio" + (this.state.searchType === constants.SEARCH_BOOK_BY_TITLE ? ' radio-selected': '')}>
                                <input id="title" type="radio" name="search-by" value={constants.SEARCH_BOOK_BY_TITLE} onChange={this.handleSearchByChange} checked={this.state.searchType === constants.SEARCH_BOOK_BY_TITLE ? 'checked' : '' } />
                                <label htmlFor="title">
                                    Title
                                </label>
                            </div>
                            <div className={"row radio" + (this.state.searchType === constants.SEARCH_BOOK_BY_AUTHOR ? ' radio-selected': '')}>
                                <input id="author" type="radio" name="search-by" value={constants.SEARCH_BOOK_BY_AUTHOR} onChange={this.handleSearchByChange} />
                                <label htmlFor="author">
                                    Author
                                </label>
                            </div>
                            <div className={"row radio" + (this.state.searchType === constants.SEARCH_BOOK_BY_SUMMARY ? ' radio-selected': '')}>
                                <input id="summary" type="radio" name="search-by" value={constants.SEARCH_BOOK_BY_SUMMARY} onChange={this.handleSearchByChange} />
                                <label htmlFor="summary">
                                    Summary
                                </label>
                            </div>
                        </div>
                        <div className="filter">
                            <div className="row">
                                <h4>Filter by Genre:</h4>
                            </div>
                            {this.props.genres.map(genre => 
                                <div key={genre._id} className="row checkbox checkbox-success">
                                    <input id={genre.name} type="checkbox" name="genre" value={genre.name} onChange={this.handleFilterChange} />
                                    <label htmlFor={genre.name} className="genre-label">
                                        {genre.name}
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="filter">
                            <div className="row">
                                <h4>Filter by Language:</h4>
                            </div>
                            {LANGUAGES.map(language =>
                                <div key={language} className="row checkbox checkbox-success">
                                    <input id={language} type="checkbox" name="language" value={language} onChange={this.handleLanguageFilterChange} />
                                    <label htmlFor={language}>
                                        {language}
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="row">
                        {this.props.books.length > 0 ?
                            this.props.books.map(book =>
                                <div key={book._id} className="card col-md-3">
                                    <Link to={"/books/" + book._id}>
                                        <img width="100px" className="card-img-top" src={book.photo} alt={book.title} />
                                    </Link>
                                    <div className="card-block">
                                        <h5 className="card-title">
                                            <Link to={"/books/" + book._id}>{book.title}</Link>
                                        </h5>
                                        <p className="card-text">by
                                            <Link to={"/authors/" + book.author._id}> {book.author.first_name} {book.author.last_name}</Link>
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">Published on {book.date_published.split('T')[0]}</small>
                                        </p>
                                    </div>
                                </div>
                            ) :
                            <p>No books were found.</p>
                        }
                                                        
                        </div>
                        
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
            this.props.search(this.props.searchValue, this.state.searchType, this.state.filters, this.state.languageFilters);
        }
    }

    handleLanguageFilterChange = (event) => {
        if (event.target.checked) {
            this.state.languageFilters.add(event.target.value);
        } else {
            this.state.languageFilters.delete(event.target.value);
        }

        if (this.props.searchValue) {
            this.props.search(this.props.searchValue, this.state.searchType, this.state.filters, this.state.languageFilters);
        }
    }

    handleSearchByChange = (event) => {
        this.setState({
            searchType: event.target.value
        }, () => {
            this.props.updateSearchType(this.state.searchType);

            this.props.search(this.props.searchValue, this.state.searchType, this.state.filters, this.state.languageFilters);
        });
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
        updateSearchType: (searchType) => dispatch(booksActions.updateSearchType(searchType)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksResultPartial);