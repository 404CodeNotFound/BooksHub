import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authorsActions from '../../../actions/authors.actions';
import * as modalsActions from '../../../actions/modals.actions';

class AuthorRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <img src={this.props.author.photo} width="20px" height="20px" alt={"image-" + this.props.author._id} />
                </td>
                <td>
                    {this.props.author.first_name} {this.props.author.last_name}
                </td>
                <td>
                    {this.props.author.nationality}
                </td>
                <td>
                    {this.props.author.birth_date.split('T')[0]}
                </td>
                <td>
                    <a href={this.props.author.website}>{this.props.author.website}</a>
                </td>
                <td>
                    <Link to={"/authors/" + this.props.author._id}>Details</Link>
                </td>
                <td>
                    <button className="action-btn" onClick={() => this.props.openEditAuthorModal(this.props.author)}>Edit</button>
                </td>
                <td>
                    <button className="action-btn">Delete</button>
                </td>
            </tr>
        );
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        openEditAuthorModal: (author) => dispatch(modalsActions.openEditAuthorModal(author))
    };
}

export default connect(null, mapDispatchToProps)(AuthorRow);

