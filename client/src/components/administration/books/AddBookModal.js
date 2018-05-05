import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import Select from 'react-select';
import * as booksActions from '../../../actions/books.actions';
import * as genresActions from '../../../actions/genres.actions';
import * as modalsActions from '../../../actions/modals.actions';

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
            <Modal visible={true} dialogClassName="modal-lg">
                <div className="modal-header">
                    <h5 className="modal-title">Add new book</h5>
                </div>
                <div className="modal-body">
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-title">Title</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-title" name="Title" type="text" onChange={(event) => this.handleTitleChange(event)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label">Author</label>
                        <div className="col-md-4">
                            <input className="form-control" id="book-author-firstName" placeholder="First Name" type="text" onChange={(event) => this.handleAuthorFirstNameChange(event)} />
                        </div>
                        <div className="col-md-4">
                            <input className="form-control" id="book-author-lastName" placeholder="Last Name" type="text" onChange={(event) => this.handleAuthorLastNameChange(event)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-photo">Photo</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-photo" name="Photo" type="text" onChange={(event) => this.handlePhotoChange(event)} />
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
                            <input className="form-control" id="book-language" name="Language" type="text" onChange={(event) => this.handleLanguageChange(event)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="book-summary">Summary</label>
                        <div className="col-md-8">
                            <input className="form-control" id="book-summary" name="Summary" type="text" onChange={(event) => this.handleSummaryChange(event)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label">Genres</label>
                        <div className="col-md-8">
                            <Select
                                closeOnSelect={!this.state.stayOpen}
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
        this.setState({ title: event.target.value });
    }

    handleAuthorFirstNameChange = (event) => {
        this.setState({ authorFirstName: event.target.value });
    }

    handleAuthorLastNameChange = (event) => {
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
        this.setState({ photo: event.target.value });
    }

    handleLanguageChange = (event) => {
        this.setState({ language: event.target.value });
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
            language: this.state.language,
            genres: genres.join(', ')
        };

        this.props.saveBook(book);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        genresSelectValues: state.administration.genresSelectValues
    };
}
function mapDispatchToProps(dispatch, ownProps) {
    return {
        saveBook: (book) => dispatch(booksActions.addBook(book)),
        closeAddBookModal: () => dispatch(modalsActions.closeAddBookModal()),
        getAllGenres: () => dispatch(genresActions.getAllGenresAsSelectValues())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBookModal);
