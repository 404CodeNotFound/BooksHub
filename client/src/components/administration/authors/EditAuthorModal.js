import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import DatePicker from 'react-date-picker';
import * as authorsActions from '../../../actions/authors.actions';
import * as modalsActions from '../../../actions/modals.actions';
import * as errorsActions from '../../../actions/error.actions';

class EditAuthorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.author._id,
            firstname: this.props.author.first_name,
            lastname: this.props.author.last_name,
            nationality: this.props.author.nationality,
            age: this.props.author.age,
            birthdate: new Date(this.props.author.birth_date.split('T')[0]),
            biography: this.props.author.biography,
            website: this.props.author.website,
            photo: this.props.author.photo
        };
    }

    render () {
        return (
            <Modal visible={true} onClickBackdrop={this.props.closeEditAuthorModal} dialogClassName="modal-lg">
                <div className="modal-header">
                    <h5 className="modal-title">Edit author</h5>
                </div>
                <div className="modal-body">
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="firstname">Firstname</label>
                        <div className="col-md-8">
                            <input className="form-control" id="firstname" name="firstname" type="text" value={this.state.firstname || ''} onChange={this.handleFirstnameChange} />
                            {this.props.firstnameError &&
                                <div className="error">{this.props.firstnameError.msg}</div>
                            }
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="lastname">Lastname</label>
                        <div className="col-md-8">
                            <input className="form-control" id="lastname" name="lastname" type="text" value={this.state.lastname || ''} onChange={this.handleLastnameChange} />
                            {this.props.lastnameError &&
                                <div className="error">{this.props.lastnameError.msg}</div>
                            }
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="nationality">Nationality</label>
                        <div className="col-md-8">
                            <input className="form-control" id="nationality" name="nationality" type="text" value={this.state.nationality || ''} onChange={this.handleNationalityChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="age">Age</label>
                        <div className="col-md-8">
                            <input className="form-control" id="age" name="age" type="text" value={this.state.age || ''} onChange={this.handleAgeChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="birthdate">Birthdate</label>
                        <div className="col-md-8">
                            <DatePicker value={this.state.birthdate} onChange={this.handleBirthdateChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="biography">Biography</label>
                        <div className="col-md-8">
                            <input className="form-control" id="biography" name="biography" type="text" value={this.state.biography || ''} onChange={this.handleBiographyChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="website">Website</label>
                        <div className="col-md-8">
                            <input className="form-control" id="website" name="website" type="text" value={this.state.website || ''} onChange={this.handleWebsiteChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="photo">Photo URL</label>
                        <div className="col-md-8">
                            <input className="form-control" id="photo" name="photo" type="text" value={this.state.photo || ''} onChange={this.handlePhotoChange} />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.handleSubmit}>
                        Edit
                    </button>
                    <button type="button" className="btn btn-primary" onClick={this.props.closeEditAuthorModal}>
                        Cancel
                    </button>
                </div>
            </Modal>
        );
    }

    handleFirstnameChange = (event) => {
        if (this.props.firstnameError) {
            this.props.removeValidationError('firstname');
        }

        this.setState({ firstname: event.target.value });
    }

    handleLastnameChange = (event) => {
        if (this.props.lastnameError) {
            this.props.removeValidationError('lastname');
        }

        this.setState({ lastname: event.target.value });
    }

    handleNationalityChange = (event) => {
        this.setState({ nationality: event.target.value });
    }

    handleAgeChange = (event) => {
        this.setState({ age: event.target.value });
    }

    handleBirthdateChange = (value) => {
        this.setState({ birthdate: value });
    }

    handleBiographyChange = (event) => {
        this.setState({ biography: event.target.value });
    }

    handleWebsiteChange = (event) => {
        this.setState({ website: event.target.value });
    }

    handlePhotoChange = (event) => {
        this.setState({ photo: event.target.value });
    }

    handleSubmit = () => {
        const author = {
            id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            nationality: this.state.nationality,
            age: this.state.age,
            birthdate: this.state.birthdate,
            biography: this.state.biography,
            website: this.state.website,
            photoUrl: this.state.photo
        };

        this.props.updateAuthor(author);
    }
}

function mapStateToProps(state, ownProps) {
    const firstnameError = state.errors.validationErrors.find(error => error.param === 'firstname');
    const lastnameError = state.errors.validationErrors.find(error => error.param === 'lastname');

    return {
        author: state.modals.authorToEdit,
        firstnameError: firstnameError,
        lastnameError: lastnameError,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateAuthor: (author) => dispatch(authorsActions.updateAuthor(author)),
        closeEditAuthorModal: () => dispatch(modalsActions.closeEditAuthorModal()),
        removeValidationError: (param) => dispatch(errorsActions.removeValidationError(param))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAuthorModal);