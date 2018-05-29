import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import Select from 'react-select';
// import Autocomplete from 'react-autocomplete';
import * as eventsActions from '../../../actions/events.actions';
import * as genresActions from '../../../actions/genres.actions';
import * as modalsActions from '../../../actions/modals.actions';
import * as errorsActions from '../../../actions/error.actions';
import DatetimeRangePicker from 'react-datetime-range-picker';

class AddEventModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            start_date: new Date(),
            end_date: new Date(),
            place: '',
            city: '',
            details: '',
            photo: '',
            genres: []
        };
    }

    componentDidMount() {
        this.props.getAllGenres();
    }

    render() {
        return (
            <Modal visible={true} onClickBackdrop={this.props.closeAddEventModal} dialogClassName="modal-lg">
                <div className="modal-header">
                    <h5 className="modal-title">Add new event</h5>
                </div>
                <div className="modal-body">
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="event-title">Title</label>
                        <div className="col-md-8">
                            <input className="form-control" id="event-title" name="Title" type="text" onChange={this.handleTitleChange} />
                            {this.props.titleError &&
                                <div className="error">{this.props.titleError.msg}</div>
                            }
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="start_date">From - To</label>
                        
                        <div className="col-md-8">
                            <DatetimeRangePicker onChange={this.handleDateRange} />
                            {this.props.startDateError &&
                                [<div className="error" key="start-date-error">{this.props.startDateError.msg}</div>,
                                <div className="error" key="end-date-error">{this.props.endDateError.msg}</div>]
                            }
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="event-place">Place</label>
                        <div className="col-md-8">
                            <input className="form-control" id="event-place" name="Place" type="text" onChange={this.handlePlaceChange} />
                            {this.props.placeError &&
                                <div className="error">{this.props.placeError.msg}</div>
                            }
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="event-city">City(town)</label>
                        <div className="col-md-8">
                            <input className="form-control" id="event-city" name="City" type="text" onChange={this.handleCityChange} />
                            {this.props.cityError &&
                                <div className="error">{this.props.cityError.msg}</div>
                            }
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="event-photo">Photo</label>
                        <div className="col-md-8">
                            <input className="form-control" id="event-photo" name="Photo" type="text" onChange={this.handlePhotoChange} />
                            {this.props.photoError &&
                                <div className="error">{this.props.photoError.msg}</div>
                            }
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="event-details">Details</label>
                        <div className="col-md-8">
                            <textarea className="form-control" rows="5" id="event-details" onChange={this.handleDetailsChange}></textarea>
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
                    <button type="button" className="btn btn-secondary" onClick={this.handleSubmit}>
                        Add
                    </button>
                    <button type="button" className="btn btn-primary" onClick={this.props.closeAddEventModal}>
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

    handleDateRange = (value) => {
        if (this.props.startDateError) {
            this.props.removeValidationError('start_date');
        }

        if (this.props.endDateError) {
            this.props.removeValidationError('end_date');
        }

        this.setState({ start_date: value.start, end_date: value.end });
    }

    handlePlaceChange = (event) => {
        if (this.props.placeError) {
            this.props.removeValidationError('place');
        }

        this.setState({ place: event.target.value });
    }

    handleCityChange = (event) => {
        if (this.props.cityError) {
            this.props.removeValidationError('city');
        }

        this.setState({ city: event.target.value });
    }

    handleDetailsChange = (event) => {
        this.setState({ details: event.target.value });
    }

    handlePhotoChange = (event) => {
        if (this.props.photoError) {
            this.props.removeValidationError('photo');
        }

        this.setState({ photo: event.target.value });
    }

    handleGenresChange = (value) => {
        this.setState({ genres: value });
    }

    handleSubmit = () => {
        const genres = this.state.genres.map(genre => genre.id);

        const event = {
            title: this.state.title,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            place: this.state.place,
            city: this.state.city,
            photo: this.state.photo,
            details: this.state.details,
            genres: genres.join(', ')
        };

        this.props.saveEvent(event, this.props.isAdminPage);
    }
}

function mapStateToProps(state, ownProps) {
    const titleError = state.errors.validationErrors.find(error => error.param === 'title');
    const startDateError = state.errors.validationErrors.find(error => error.param === 'start_date');
    const placeError = state.errors.validationErrors.find(error => error.param === 'place');
    const cityError = state.errors.validationErrors.find(error => error.param === 'city');
    const photoError = state.errors.validationErrors.find(error => error.param === 'photo');
    const genresError = state.errors.validationErrors.find(error => error.param === 'genres');

    return {
        genresSelectValues: state.genres.genresSelectValues,
        titleError: titleError,
        startDateError: startDateError,
        placeError: placeError,
        cityError: cityError,
        photoError: photoError,
        genresError: genresError
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        saveEvent: (event, isAdminPage) => dispatch(eventsActions.addEvent(event, isAdminPage)),
        closeAddEventModal: () => dispatch(modalsActions.closeAddEventModal()),
        getAllGenres: () => dispatch(genresActions.getAllGenresAsSelectValues()),
        removeValidationError: (param) => dispatch(errorsActions.removeValidationError(param))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEventModal);
