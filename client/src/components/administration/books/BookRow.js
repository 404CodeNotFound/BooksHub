import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as modalsActions from '../../../actions/modals.actions';
import EditBookModal from './EditBookModal';

class BookRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <img src={this.props.book.photo} width="20px" height="20px" alt={"image-" + this.props.book._id} />
                </td>
                <td>
                    {this.props.book.title}
                </td>
                <td>
                    {this.props.book.isbn}
                </td>
                <td>
                    {this.props.book.date_published}
                </td>
                <td>
                    {this.props.book.author.first_name} {this.props.book.author.last_name}
                </td>
                <td>
                    {this.props.book.publisher}
                </td>
                <td>
                    <Link to={"/books/" + this.props.book.title}>Details |</Link>
                </td>
                <td>
                    <button onClick={this.props.openEditBookModal}>Edit |</button>
                    {this.props.isVisibleEditBook &&
                        <EditBookModal book={this.props.book} />
                    }
                </td>
                <td>
                    <button>Delete |</button>
                </td>
            </tr>
        );
    }
};

function mapStateToProps(state, ownProps) {
    return {
        isVisibleEditBook: state.modals.showEditBookModal
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        openEditBookModal: () => dispatch(modalsActions.openEditBookModal())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookRow);
