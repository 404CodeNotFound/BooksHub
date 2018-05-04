import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as booksActions from '../../../actions/books.actions';
import * as modalsActions from '../../../actions/modals.actions';
import BookRow from './BookRow';
import Pagination from "react-js-pagination";
import AddBookModal from './AddBookModal';
import {Portal} from 'react-portal';

class AllBooksList extends Component {
    state = { activePage: 1 };

    componentDidMount() {
        this.props.getAllBooks(this.state.activePage);
    }

    render() {
        return (
            this.props.books.length > 0 ?
                [<div id="page-content-wrapper administration-box" key="books-list">
                    <div id="books">
                        <h2>Books</h2>
                        <button type="button" className="btn btn-main-green" onClick={this.props.openModal}>+ Add</button>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>
                                        PhotoUrl
                        </th>
                                    <th>
                                        Title
                        </th>
                                    <th>
                                        ISBN
                        </th>
                                    <th>
                                        Published
                        </th>
                                    <th>
                                        Author
                        </th>
                                    <th>
                                        Publisher
                        </th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {this.props.books.map(book =>
                                    <BookRow key={book._id} book={book} />
                                )}
                            </tbody>
                        </table>
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
                    <Portal>
                        <AddBookModal />
                        </Portal>
                </div>
                ] :
                <div className="loader"></div>
        )
    }

    selectPage = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        this.props.getAllBooks(pageNumber);
    }
}

function mapStateToProps(state, ownProps) {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('id');

    return {
        books: state.administration.books,
        booksCount: state.administration.booksCount,
        currentAdmin: { username: username, id: userId },
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getAllBooks: (pageNumber) => dispatch(booksActions.getAllBooks(pageNumber)),
        openModal: () => dispatch(modalsActions.openModal())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBooksList);
