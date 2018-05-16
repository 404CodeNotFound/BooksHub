import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import * as genresActions from '../../../actions/genres.actions';
import * as modalsActions from '../../../actions/modals.actions';

class AddGenreModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    render () {
        return (
            <Modal visible={true} dialogClassName="modal-lg">
                <div className="modal-header">
                    <h5 className="modal-title">Add new genre</h5>
                </div>
                <div className="modal-body">
                    <div className="form-group row">
                        <label className="col-md-2 control-label" htmlFor="name">Name</label>
                        <div className="col-md-8">
                            <input className="form-control" id="name" name="name" type="text" onChange={this.handleNameChange} />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.handleSubmit}>
                        Add
                    </button>
                    <button type="button" className="btn btn-primary" onClick={this.props.closeAddGenreModal}>
                        Cancel
                    </button>
                </div>
            </Modal>
        );
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleSubmit = () => {
        const genre = {
            name: this.state.name
        };

        this.props.addGenre(genre);
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        addGenre: (genre) => dispatch(genresActions.addGenre(genre)),
        closeAddGenreModal: () => dispatch(modalsActions.closeAddGenreModal())
    };
}

export default connect(null, mapDispatchToProps)(AddGenreModal);