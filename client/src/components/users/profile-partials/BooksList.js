import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import * as booksActions from '../../../actions/books.actions';

class BooksList extends Component {
    state = { activePage: 1 };

    componentDidMount() {
        if (this.props.title === 'Currently Reading Collection') {
            this.props.getCurrentlyReadingBooks(this.props.userId, 1);
        } else if (this.props.title === 'Want to Read Collection') {
            this.props.getWantToReadBooks(this.props.userId, 1);
        } else {
            this.props.getReadBooks(this.props.userId, 1);
        }
    }

    render() {
        return (
            [
                <div key="title" className="row title">
                    <h3>{this.props.title}</h3>
                </div>,
                <div key="books-list" className="margin2x">
                    <div className="row">
                        {this.props.books.map(book =>
                            <div key={book._id} className="col-md-4 margin-bottom-60">
                                <div className="float-left">
                                    <img src={book.photo} width="200px" alt="book-logo" />
                                    <div>
                                        <h3 className="text-strong text-size-20 text-line-height-1 margin-bottom-20">{book.title}</h3>
                                    </div>
                                    <p>
                                        {book.summary.substr(0, 50)}...
                                        <Link className="text-more-info text-primary" to={"/books/" + book.title}>Read more</Link>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>,
                    {this.props.books.length > 0 &&
                        <div key="pages" className="row">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={1}
                                totalItemsCount={this.props.booksCount}
                                pageRangeDisplayed={5}
                                onChange={this.selectPage}
                            />
                        </div>
                    }
                </div>
            ]
        );
    }

    selectPage = (pageNumber) => {
        this.setState({ activePage: pageNumber });

        if (this.props.title === 'Currently Reading Collection') {
            this.props.getCurrentlyReadingBooks(this.props.userId, pageNumber);
        } else if (this.props.title === 'Want to Read Collection') {
            this.props.getWantToReadBooks(this.props.userId, pageNumber);
        } else {
            this.props.getReadBooks(this.props.userId, pageNumber);
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        books: state.users.books,
        booksCount: state.users.booksCount,
        userId: ownProps.userId
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getCurrentlyReadingBooks: (id, page) => dispatch(booksActions.getCurrentlyReadingBooks(id, page)),
        getWantToReadBooks: (id, page) => dispatch(booksActions.getWantToReadBooks(id, page)),
        getReadBooks: (id, page) => dispatch(booksActions.getReadBooks(id, page)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);