import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import Select from 'react-select';
import * as booksActions from '../../../actions/books.actions';
import * as genresActions from '../../../actions/genres.actions';
import * as modalsActions from '../../../actions/modals.actions';
import * as errorsActions from '../../../actions/error.actions';

const LANGUAGES = [
    { label: 'Bulgarian', value: 'Bulgarian' },
    { label: 'English', value: 'English' },
    { label: 'French', value: 'French' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'German', value: 'German' },
    { label: 'Italian', value: 'Italian' },
];

class AddBookModal extends Component {
    state = {
        title: '',
        authorFirstName: '',
        authorLastName: '',
        isbn: '',
        summary: '',
        photo: '',
        language: '',
        publisher: '',
        genres: []
    };

    componentDidMount() {
        this.props.getAllGenres();
    }

    render() {
        return (
            <Modal visible={true} onClickBackdrop={this.props.closeAddBookModal} dialogClassName="modal-lg">
                <div className="modal-header">
                    <h5 className="modal-title">Add new book</h5>
                </div>
                <div className="modal-body">
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-title">Title</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-title" name="Title" type="text" onChange={(event) => this.handleTitleChange(event)} />
                            {this.props.titleError &&
                                <div className="error">{this.props.titleError.msg}</div>
                            }
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label">Author</label>
                        <div className="col-md-4">
                            <input className="form-control" id="book-author-firstName" placeholder="First Name" type="text" onChange={(event) => this.handleAuthorFirstNameChange(event)} />
                            {this.props.authorFirstNameError &&
                                <div className="error">{this.props.authorFirstNameError.msg}</div>
                            }
                        </div>
                        <div className="col-md-4">
                            <input className="form-control" id="book-author-lastName" placeholder="Last Name" type="text" onChange={(event) => this.handleAuthorLastNameChange(event)} />
                            {this.props.authorLastNameError &&
                                <div className="error">{this.props.authorLastNameError.msg}</div>
                            }
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-photo">Photo</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-photo" name="Photo" type="text" onChange={(event) => this.handlePhotoChange(event)} />
                            {this.props.photoError &&
                                <div className="error">{this.props.photoError.msg}</div>
                            }
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-isbn">ISBN</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-isbn" name="ISBN" type="text" onChange={(event) => this.handleIsbnChange(event)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-publisher">Publisher</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-publisher" name="Publisher" type="text" onChange={(event) => this.handlePublisherChange(event)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-language">Language</label>
                        <div className="col-md-8">
                            <Select
                                closeOnSelect={true}
                                onChange={this.handleLanguageChange}
                                options={LANGUAGES}
                                placeholder="Select language"
                                value={this.state.language}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-summary">Summary</label>
                        <div className="col-md-8">
                            <textarea className="form-control" rows="5" id="book-summary" onChange={(event) => this.handleSummaryChange(event)}></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label">Genres</label>
                        <div className="col-md-8">
                            <Select
                                multi
                                onChange={this.handleGenresChange}
                                options={this.props.genresSelectValues}
                                placeholder="Select genres"
                                joinValues
                                value={this.state.genres}
                            />
                            {this.props.genresError &&
                                <div className="error">{this.props.genresError.msg}</div>
                            }
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.submitBook}>
                        Add
          </button>
                    <button type="button" className="btn btn-primary" onClick={this.props.closeAddBookModal}>
                        Cancel
          </button>
                </div>
            </Modal>
        )
    }

    handleTitleChange = (event) => {
        if (this.props.titleError) {
            this.props.removeValidationError('title');
        }

        this.setState({ title: event.target.value });
    }

    handleAuthorFirstNameChange = (event) => {
        if (this.props.authorError) {
            this.props.removeValidationError('authorFirstName.authorLastName');
        }

        this.setState({ authorFirstName: event.target.value });
    }

    handleAuthorLastNameChange = (event) => {
        if (this.props.authorError) {
            this.props.removeValidationError('authorFirstName.authorLastName');
        }

        this.setState({ authorLastName: event.target.value });
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
        if (this.props.photoError) {
            this.props.removeValidationError('photo');
        }

        this.setState({ photo: event.target.value });
    }

    handleLanguageChange = (value) => {
        this.setState({ language: value });
    }

    handleGenresChange = (value) => {
        this.setState({ genres: value });
    }

    submitBook = () => {
        const genres = this.state.genres.map(selectedItem => selectedItem.id);

        const book = {
            title: this.state.title,
            authorFirstName: this.state.authorFirstName,
            authorLastName: this.state.authorLastName,
            isbn: this.state.isbn,
            publisher: this.state.publisher,
            summary: this.state.summary,
            photo: this.state.photo,
            language: this.state.language.label,
            genres: genres.join(', ')
        };

        this.props.saveBook(book);
    }
}

function mapStateToProps(state, ownProps) {
    const titleError = state.errors.validationErrors.find(error => error.param === 'title');
    const authorFirstNameError = state.errors.validationErrors.find(error => error.param === 'authorFirstName');
    const authorLastNameError = state.errors.validationErrors.find(error => error.param === 'authorLastName');
    const photoError = state.errors.validationErrors.find(error => error.param === 'photo');
    const genresError = state.errors.validationErrors.find(error => error.param === 'genres');

    return {
        genresSelectValues: state.genres.genresSelectValues,
        titleError: titleError,
        authorFirstNameError: authorFirstNameError,
        authorLastNameError: authorLastNameError,
        photoError: photoError,
        genresError: genresError
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        saveBook: (book) => dispatch(booksActions.addBook(book)),
        closeAddBookModal: () => dispatch(modalsActions.closeAddBookModal()),
        getAllGenres: () => dispatch(genresActions.getAllGenresAsSelectValues()),
        removeValidationError: (param) => dispatch(errorsActions.removeValidationError(param))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookModal);
