import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
                    {this.props.author.website}
                </td>
                <td>
                    <Link to={"/authors/" + this.props.author._id}>Details</Link>
                </td>
                <td>
                    <button className="action-btn">Edit</button>
                </td>
                <td>
                    <button className="action-btn">Delete</button>
                </td>
            </tr>
        );
    }
}

export default connect(null, null)(AuthorRow);

