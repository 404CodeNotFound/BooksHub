import React, { Component } from 'react';
import Modal from 'react-bootstrap4-modal';
import DatePicker from 'react-date-picker';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as usersActions from '../../../actions/users.actions';
import * as modalsActions from '../../../actions/modals.actions';
import * as genresActions from '../../../actions/genres.actions';

const LANGUAGES = [
	{ label: 'Bulgarian', value: 'Bulgarian' },
	{ label: 'English', value: 'English' },
	{ label: 'French', value: 'French' },
	{ label: 'Spanish', value: 'Spanish' },
	{ label: 'German', value: 'German' },
	{ label: 'Italian', value: 'Italian' },
];

class EditUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.username,
            email: this.props.user.email,
            firstname: this.props.user.first_name,
            lastname: this.props.user.last_name,
            nationality: this.props.user.nationality,
            age: this.props.user.age,
            birthdate: new Date(this.props.user.birth_date.split('T')[0]),
            gender: this.props.user.gender,
            favourite_quote: this.props.user.favourite_quote,
            languages: this.props.user.languages,
            genres: this.props.user.genres
        };
    }

    componentDidMount() {
        this.props.getAllGenres();
    }

    render() {
        return (
            <Modal visible={true} onClickBackdrop={this.props.closeEditUserModal}>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-header">
                        <h4 className="modal-title">Edit your profile</h4>
                        <button type="button" className="close" onClick={this.props.closeEditUserModal}>&times;</button>
                    </div>

                    <div className="modal-body">
                        <div className="form-group row">
                            <label className="col-md-2 control-label" htmlFor="email">Email</label>
                            <div className="col-md-8">
                                <input className="form-control" id="email" name="email" type="text" value={this.state.email || ''} onChange={this.handleEmailChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 control-label" htmlFor="firstname">First Name</label>
                            <div className="col-md-8">
                                <input className="form-control" id="firstname" name="firstname" type="text" value={this.state.firstname || ''} onChange={this.handleFirstnameChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 control-label" htmlFor="lastname">Last Name</label>
                            <div className="col-md-8">
                                <input className="form-control" id="lastname" name="lastname" type="text" value={this.state.lastname || ''} onChange={this.handleLastnameChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 control-label" htmlFor="nationality">Nationality</label>
                            <div className="col-md-8">
                                <input className="form-control" id="nationality" name="nationality" type="text" value={this.state.nationality || ''} onChange={this.handleNationalityChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 control-label" htmlFor="languages">Languages</label>
                            <div className="col-md-8">
                                <Select
                                    closeOnSelect={true}
                                    multi
                                    onChange={this.handleSelectChange}
                                    options={LANGUAGES}
                                    placeholder="Select languages"
                                    joinValues
                                    value={this.state.languages}
                                />
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
                            <label className="col-md-2 control-label" htmlFor="gender">Gender</label>
                            <div className="col-md-8">
                                <select name="gender" value={this.state.gender} onChange={this.handleGenderChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <label className="col-md-2 control-label" htmlFor="favouriteQuote">Favourite quote</label>
                            <div className="col-md-8">
                                <input className="form-control" id="favouriteQuote" name="favouriteQuote" type="text" value={this.state.favourite_quote || ''} onChange={this.handleQuoteChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-md-2 control-label">Favourite genres</label>
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
                        <input type="submit" value="Edit" className="btn btn-main-green" />
                        <button type="button" className="btn" onClick={this.props.closeEditUserModal}>Close</button>
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

    handleSelectChange = (value) => {
        this.setState({ languages: value });
    }

    handleAgeChange = (event) => {
        this.setState({ age: event.target.value });
    }

    handleBirthdateChange = (value) => {
        this.setState({ birthdate: value });
    }

    handleGenderChange = (event) => {
        this.setState({ gender: event.target.value });
    }

    handleQuoteChange = (event) => {
        this.setState({ favourite_quote: event.target.value });
    }

    handleGenresChange = (value) => {
        this.setState({ genres: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const languages = this.state.languages.map(language => language.label);
        const genres = this.state.genres.map(genre => genre.id);
        var user = {
            username: this.state.username,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            nationality: this.state.nationality,
            languages: languages.join(', '),
            genres: genres.join(', '),
            age: this.state.age,
            birthdate: this.state.birthdate,
            gender: this.state.gender,
            favouriteQuote: this.state.favourite_quote
        };

        this.props.updateProfile(user);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.modals.userToEdit,
        genresSelectValues: state.genres.genresSelectValues,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateProfile: (user) => dispatch(usersActions.updateProfile(user)),
        closeEditUserModal: () => dispatch(modalsActions.closeEditUserModal()),
        getAllGenres: () => dispatch(genresActions.getAllGenresAsSelectValues())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserModal);