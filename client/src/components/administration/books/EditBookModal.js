import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import Select from 'react-select';
import * as booksActions from '../../../actions/books.actions';
import * as genresActions from '../../../actions/genres.actions';
import * as modalsActions from '../../../actions/modals.actions';

class EditBookModal extends Component {
    state = {
        title: this.props.book.title,
        isbn: this.props.book.isbn,
        summary: this.props.book.summary,
        photo: this.props.book.photo,
        language: this.props.book.language,
        publisher: this.props.book.publisher,
        genres: this.props.book.genres
    };

    componentDidMount() {
        this.props.getAllGenres();
    }

    render() {
        return (
            <Modal visible={true} onClickBackdrop={this.props.closeEditBookModal} dialogClassName="modal-lg">
                <div className="modal-header">
                    <h5 className="modal-title">Edit book</h5>
                </div>
                <div className="modal-body">
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-title">Title</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-title" value={this.state.title || ''} type="text" onChange={(event) => this.handleTitleChange(event)} />
                            {this.props.titleError &&
                                <div className="error">{this.props.titleError.msg}</div>
                            }
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-photo">Photo</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-photo" value={this.state.photo || ''} type="text" onChange={(event) => this.handlePhotoChange(event)} />
                            {this.props.photoError &&
                                <div className="error">{this.props.photoError.msg}</div>
                            }
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-isbn">ISBN</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-isbn" value={this.state.isbn || ''} type="text" onChange={(event) => this.handleIsbnChange(event)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-publisher">Publisher</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-publisher" value={this.state.publisher || ''} type="text" onChange={(event) => this.handlePublisherChange(event)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-language">Language</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-language" value={this.state.language || ''} type="text" onChange={(event) => this.handleLanguageChange(event)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-summary">Summary</label>
                        <div className="col-md-8">
                            <textarea className="form-control" rows="5" id="book-summary" value={this.state.summary || ''} onChange={(event) => this.handleSummaryChange(event)}></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label">Genres</label>
                        <div className="col-md-8">
                            <Select
                                closeOnSelect={true}
                                multi
                                onChange={this.handleGenresChange}
                                options={this.props.genresSelectValues}
                                placeholder="Select genres"
                                joinValues
                                value={this.state.genres}
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.submitBook}>
                        Edit
          </button>
                    <button type="button" className="btn btn-primary" onClick={this.props.closeEditBookModal}>
                        Cancel
          </button>
                </div>
            </Modal>
        )
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleIsbnChange = (event) => {
        this.setState({ isbn: event.target.value });
    }

    handlePublisherChange = (event) => {
        this.setState({ publisher: event.target.value });
    }

    handleSummaryChange = (event) => {
        this.setState({ summary: event.target.value });
    }

    handlePhotoChange = (event) => {
        this.setState({ photo: event.target.value });
    }

    handleLanguageChange = (event) => {
        this.setState({ language: event.target.value });
    }

    handleGenresChange = (value) => {
        debugger;
        this.setState({ genres: value });
    }

    submitBook = (event) => {
        const g = this.state.genres;
        const genres = g.map((selectedItem) => selectedItem.id);
        const book = {
            id: this.props.book._id,
            title: this.state.title,
            isbn: this.state.isbn,
            publisher: this.state.publisher,
            summary: this.state.summary,
            photo: this.state.photo,
            language: this.state.language,
            genres: genres.join(', ')
        };

        this.props.saveBook(book);
    }
}

function mapStateToProps(state, ownProps) {
    const titleError = state.errors.validationErrors.find(error => error.param === 'title');
    const authorError = state.errors.validationErrors.find(error => error.param === 'authorFirstName.authorLastName');
    const photoError = state.errors.validationErrors.find(error => error.param === 'photo');

    return {
        book: state.modals.bookToEdit,
        genresSelectValues: state.genres.genresSelectValues,
        titleError: titleError,
        authorError: authorError,
        photoError: photoError
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        saveBook: (book) => dispatch(booksActions.editBook(book)),
        closeEditBookModal: () => dispatch(modalsActions.closeEditBookModal()),
        getAllGenres: () => dispatch(genresActions.getAllGenresAsSelectValues())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBookModal);
