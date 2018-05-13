import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as usersActions from '../../../actions/users.actions';
import * as modalsActions from '../../../actions/modals.actions';

class UserRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <img src={this.props.user.photo} width="20px" height="20px" alt={"image-" + this.props.user._id} />
                </td>
                <td>
                    {this.props.user.first_name} {this.props.user.last_name}
                </td>
                <td>
                    <Link to={"/users/" + this.props.user.username}>{this.props.user.username}</Link>
                </td>
                <td>
                    {this.props.user.email}
                </td>
                <td>
                    {this.props.user.nationality}
                </td>
                <td>
                    {this.props.user.birth_date.split('T')[0]}
                </td>
                <td>
                    {this.props.user.role}
                </td>
                <td>
                    {this.props.user.role === 'Admin' ? (
                        <button className="action-btn">Make admin</button>
                    ) : (
                        <button className="action-btn">Remove admin</button>
                    )}
                </td>
                <td>
                    <button className="action-btn" onClick={() => this.props.openEditUserModal(this.props.user)}>Edit</button>
                </td>
                <td>
                    <button className="action-btn" onClick={() => this.props.deleteUser(this.props.user._id)}>Delete</button>
                </td>
            </tr>
        );
    }
}

export default connect(null, null)(UserRow);

