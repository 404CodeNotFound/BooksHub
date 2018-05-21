import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import DatePicker from 'react-date-picker';
import * as authorsActions from '../../../actions/authors.actions';
import * as modalsActions from '../../../actions/modals.actions';

class AddAuthorModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            nationality: '',
            age: 1,
            birthdate: new Date(),
            biography: '',
            website: ''
        };
    }

    render () {
        return (
            <Modal visible={true} dialogClassName="modal-lg">
                <div className="modal-header">
                    <h5 className="modal-title">Add new author</h5>
                </div>
                <div className="modal-body">
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="firstname">Firstname</label>
                        <div className="col-md-8">
                            <input className="form-control" id="firstname" name="firstname" type="text" onChange={this.handleFirstnameChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="lastname">Lastname</label>
                        <div className="col-md-8">
                            <input className="form-control" id="lastname" name="lastname" type="text" onChange={this.handleLastnameChange} />
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="nationality">Nationality</label>
                        <div className="col-md-8">
                            <input className="form-control" id="nationality" name="nationality" type="text" onChange={this.handleNationalityChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="age">Age</label>
                        <div className="col-md-8">
                            <input className="form-control" id="age" name="age" type="text" onChange={this.handleAgeChange} />
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
                            <input className="form-control" id="biography" name="biography" type="text" onChange={this.handleBiographyChange} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="website">Website</label>
                        <div className="col-md-8">
                            <input className="form-control" id="website" name="website" type="text" onChange={this.handleWebsiteChange} />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.handleSubmit}>
                        Add
                    </button>
                    <button type="button" className="btn btn-primary" onClick={this.props.closeAddAuthorModal}>
                        Cancel
                    </button>
                </div>
            </Modal>
        );
    }

    handleFirstnameChange = (event) => {
        this.setState({ firstname: event.target.value });
    }

    handleLastnameChange = (event) => {
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

    handleSubmit = () => {
        const author = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            nationality: this.state.nationality,
            age: this.state.age,
            birthdate: this.state.birthdate,
            biography: this.state.biography,
            website: this.state.website
        };

        debugger;
        this.props.addAuthor(author);
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addAuthor: (author) => dispatch(authorsActions.addAuthor(author)),
        closeAddAuthorModal: () => dispatch(modalsActions.closeAddAuthorModal())
    };
}

export default connect(null, mapDispatchToProps)(AddAuthorModal);