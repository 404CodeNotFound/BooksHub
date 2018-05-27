import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as eventsActions from '../../../actions/events.actions';
import * as modalsActions from '../../../actions/modals.actions';
import EditEventModal from '../../events/common/EditEventModal';

class EventRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <img src={this.props.event.photo} width="20px" height="20px" alt={this.props.event.id} />
                </td>
                <td>
                    {this.props.event.title}
                </td>
                <td>
                    {this.props.event.start_date.split('T')[0]}
                </td>
                <td>
                    {this.props.event.end_date.split('T')[0]}
                </td>
                <td>
                    {this.props.event.place}
                </td>
                <td>
                    {this.props.event.city}
                </td>
                <td>
                    <Link to={"/users/" + this.props.event.creator.username}>{this.props.event.creator.username}</Link>
                </td>
                <td>
                    <Link to={"/events/" + this.props.event._id}>Details</Link>
                </td>
                <td>
                    <button className="action-btn" onClick={() => this.props.openEditEventModal(this.props.event)}>Edit</button>
                    {this.props.isVisibleEditEventModal &&
                        <EditEventModal isAdminPage={true} />
                    }
                </td>
                <td>
                    <button className="action-btn" onClick={() => this.props.deleteEvent(this.props.event._id)}>Delete</button>
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        isVisibleEditEventModal: state.modals.showEditEventModal,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        deleteEvent: (id) => dispatch(eventsActions.deleteEvent(id)),
        openEditEventModal: (event) => dispatch(modalsActions.openEditEventModal(event)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventRow);

