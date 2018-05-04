import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as booksActions from '../../../actions/books.actions';
import Modal from 'react-bootstrap4-modal';

class AddBookModal extends Component {
    render() {
        return (
            <Modal visible={true} onClickBackdrop={this.modalBackdropClicked} dialogClassName="modal-lg">
                <div className="modal-header">
                    <h5 className="modal-title">Add new book</h5>
                </div>
                <div className="modal-body">
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-title">Title</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-title" name="Title" type="text" value="" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-author">Author</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-author" name="Author" type="text" value="" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-isbn">ISBN</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-isbn" name="ISBN" type="text" value="" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-description">Description</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-description" name="Description" type="text" value="" />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.onPanic}>
                        Add
          </button>
                    <button type="button" className="btn btn-primary" onClick={this.onFirePhasers}>
                        Cancel
          </button>
                </div>
            </Modal>
        )
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
        saveBook: (book) => dispatch(booksActions.getAllBooks(book))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookModal);
