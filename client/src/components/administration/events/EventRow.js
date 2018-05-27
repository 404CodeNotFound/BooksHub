import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as eventsActions from '../../../actions/events.actions';
import * as modalsActions from '../../../actions/modals.actions';
// import EditUserModal from '../../users/common/EditUserModal';

class EventRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <img src={this.props.event.photo} width="20px" height="20px" alt={"image-" + this.props.event._id} />
                </td>
                <td>
                    {this.props.event.title}
                </td>
                <td>
                    {this.props.event.start_date}
                </td>
                <td>
                    {this.props.event.end_date}
                </td>
                <td>
                    {this.props.event.place}
                </td>
                <td>
                    {this.props.event.city}
                </td>
                <td>
                    {this.props.event.creator}
                </td>
                <td>
                    <Link to={"/events/" + this.props.event._id}>Details</Link>
                </td>
                <td>
                    {/* <button className="action-btn" onClick={() => this.props.openEditUserModal(this.props.user)}>Edit</button>
                    {this.props.isVisibleEditUserModal &&
                        <EditUserModal isAdminPage={true} />
                    } */}
                </td>
                <td>
                    {/* <button className="action-btn" onClick={() => this.props.deleteUser(this.props.user._id)}>Delete</button> */}
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        // isVisibleEditUserModal: state.modals.showEditUserModal,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        // deleteUser: (id) => dispatch(usersActions.deleteUser(id)),
        // openEditUserModal: (user) => dispatch(modalsActions.openEditUserModal(user)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventRow);

