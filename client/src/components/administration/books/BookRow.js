import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as modalsActions from '../../../actions/modals.actions';
import * as booksActions from '../../../actions/books.actions';

class BookRow extends Component {    
    render() {
        return (
            <tr>
                <td>
                    <img src={this.props.book.photo} width="20px" height="20px" alt={"image-" + this.props.book._id} />
                </td>
                <td>
                    {this.props.book.title}
                </td>
                <td>
                    {this.props.book.isbn}
                </td>
                <td>
                    {this.props.book.date_published}
                </td>
                <td>
                    {this.props.book.author.first_name} {this.props.book.author.last_name}
                </td>
                <td>
                    {this.props.book.publisher}
                </td>
                <td>
                    <Link to={"/books/" + this.props.book.title}>Details</Link>
                </td>
                <td>
                    <button className="action-btn" onClick={() => this.props.openEditBookModal(this.props.book)}>Edit</button>
                </td>
                <td>
                    <button className="action-btn" onClick={() => this.props.deleteBook(this.props.book._id)}>Delete</button>
                </td>
            </tr>
        );
    }
};

function mapDispatchToProps(dispatch, ownProps) {
    return {
        openEditBookModal: (book) => dispatch(modalsActions.openEditBookModal(book)),
        deleteBook: (bookId) => dispatch(booksActions.deleteBook(bookId))
    };
}

export default connect(null, mapDispatchToProps)(BookRow);
