import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as genresActions from '../../../actions/genres.actions';

class GenreRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.genre.name}</td>
                <td>
                    <button className="action-btn" onClick={() => this.props.deleteGenre(this.props.genre._id)}>Delete</button>
                </td>
            </tr>
        );
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        deleteGenre: (genreId) => dispatch(genresActions.deleteGenre(genreId))
    };
}

export default connect(null, mapDispatchToProps)(GenreRow);

