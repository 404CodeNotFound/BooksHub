import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as booksActions from '../../../actions/books.actions';
import * as modalsActions from '../../../actions/modals.actions';
import BookRow from './BookRow';
import Pagination from "react-js-pagination";
import AddBookModal from './AddBookModal';
import EditBookModal from './EditBookModal';

class AllBooksList extends Component {
    state = { activePage: 1, isOpen: false };

    componentDidMount() {
        this.props.getAllBooks(this.state.activePage);
    }

    render() {
        return (
            // this.props.books.length > 0 ?
                <div id="page-content-wrapper administration-box" key="books-list">
                    <div id="books">
                        <h2>Books</h2>
                        <button type="button" className="btn btn-main-green" onClick={this.props.openAddBookModal}>+ Add</button>
                        {this.props.books.length > 0 &&
                            [<table className="table">
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
                            </table>,
                            
                            <div key="pages" className="row">
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={10}
                                    totalItemsCount={this.props.booksCount}
                                    pageRangeDisplayed={5}
                                    onChange={this.selectPage}
                                />
                            </div>]
                        }

                    </div>
                    {this.props.isVisibleAddBookModal && 
                        <AddBookModal />
                    }
                    {this.props.isVisibleEditBookModal && 
                        <EditBookModal />        
                    }                
                </div>
                // ] :
                // <div className="loader"></div>
        )
    }

    selectPage = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        this.props.getAllBooks(pageNumber);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        books: state.administration.books,
        booksCount: state.administration.booksCount,
        isVisibleAddBookModal: state.modals.showAddBookModal,
        isVisibleEditBookModal: state.modals.showEditBookModal
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getAllBooks: (pageNumber) => dispatch(booksActions.getAllBooks(pageNumber)),
        openAddBookModal: () => dispatch(modalsActions.openAddBookModal())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBooksList);
