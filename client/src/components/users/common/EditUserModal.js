import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
// import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as usersActions from '../../../actions/users.actions';

class EditUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Modal visible={this.props.isVisible} onClickBackdrop={this.props.toggleModal}>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-header">
                        <h4 className="modal-title">Edit your profile</h4>
                        <button type="button" className="close" onClick={this.props.toggleModal}>&times;</button>
                    </div>

                    <div className="modal-body">
                        <div className="form-group row">
                            <label className="col-md-2 control-label" htmlFor="email">Email</label>
                            <div className="col-md-8">
                                <input className="form-control" id="email" name="email" type="text" value={this.state.email} onChange={this.handleEmailChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 control-label" htmlFor="firstname">First Name</label>
                            <div className="col-md-8">
                                <input className="form-control" id="firstname" name="firstname" type="text" value={this.state.firstname} onChange={this.handleFirstnameChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 control-label" htmlFor="lastname">Last Name</label>
                            <div className="col-md-8">
                                <input className="form-control" id="lastname" name="lastname" type="text" value={this.state.lastname} onChange={this.handleLastnameChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 control-label" htmlFor="nationality">Nationality</label>
                            <div className="col-md-8">
                                <input className="form-control" id="nationality" name="nationality" type="text" value={this.state.nationality} onChange={this.handleNationalityChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 control-label" htmlFor="age">Age</label>
                            <div className="col-md-8">
                                <input className="form-control" id="age" name="age" type="text" value={this.state.age} onChange={this.handleAgeChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 control-label" htmlFor="age">Gender</label>
                            <div className="col-md-8">
                                <input className="form-control" id="age" name="age" type="text" value={this.state.age} onChange={this.handleAgeChange} />
                            </div>
                        </div>
                        
                        {/* <div className="form-group row">
                            <label className="col-md-2 control-label" htmlFor="gender">Gender</label>
                            <div className="col-md-8">
                                <ButtonToolbar>
                                    <DropdownButton title="Choose" id="dropdown-size-medium">
                                        <MenuItem eventKey="male">Male</MenuItem>
                                        <MenuItem eventKey="female">Female</MenuItem>
                                    </DropdownButton>
                                </ButtonToolbar>
                            </div>
                        </div> */}
                        
                        <div className="form-group row">
                            <label className="col-md-2 control-label" htmlFor="favouriteQuote">Favourite quote</label>
                            <div className="col-md-8">
                                <input className="form-control" id="favouriteQuote" name="favouriteQuote" type="text" value={this.state.favouriteQuote} onChange={this.handleQuoteChange} />
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <input type="submit" value="Edit" className="btn btn-main-green" />
                        <button type="button" className="btn" onClick={this.props.toggleModal}>Close</button>
                    </div>
                </form>
            </Modal>
        );
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
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

    handleQuoteChange = (event) => {
        this.setState({ favouriteQuote: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // handle data

        this.props.toggleModal();
    }
}

export default EditUserModal;