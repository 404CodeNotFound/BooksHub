import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import * as modalsActions from '../../actions/modals.actions';
import ParticipantPartial from './ParticipantPartial';

class AllParticipantsList extends Component {
    render() {
        return (
            <Modal visible={true} onClickBackdrop={this.props.closeAllParticipantsModal} dialogClassName="modal-lg">
                <div className="modal-header">
                    <h5 className="modal-title">All participants</h5>
                </div>
                <div className="modal-body">
                    
                <div class="friend-list">
                    <div class="row">
                        {this.props.participants.map(participant => 
                            <ParticipantPartial key={participant._id} participant={participant} />
                        )}
                    </div>
                </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={this.props.closeAllParticipantsModal}>
                        Cancel
                    </button>
                </div>
            </Modal>
        )
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        closeAllParticipantsModal: () => dispatch(modalsActions.closeAllParticipantsModal()),
    };
}

export default connect(null, mapDispatchToProps)(AllParticipantsList);
