import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import * as modalsActions from '../../actions/modals.actions';
import * as usersActions from '../../actions/users.actions';
import FriendPartial from './FriendPartial';

class RecommendBookModal extends Component {
    componentDidMount() {
        this.props.getUserFriends(this.props.currentUser.id);
    }
    
    render() {
        return (
            <Modal visible={true} onClickBackdrop={this.props.closeRecommendBookModal} dialogClassName="modal-lg">
                <div className="modal-header">
                    <h5 className="modal-title">Recommend <i>{this.props.book.title}</i> to your friends</h5>
                </div>
                <div className="modal-body">
                    
                    {this.props.friends.length > 0 ?
                        <div className="friend-list">
                            <div className="row">
                                {this.props.friends.map(friend => 
                                    <FriendPartial key={friend._id} friend={friend} bookId={this.props.book.id} />
                                )}
                            </div>
                        </div>
                        :
                        <div>You have no friends yet.</div>
                    }

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={this.props.closeRecommendBookModal}>
                        Cancel
                    </button>
                </div>
            </Modal>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const userId = localStorage.getItem('id');

    return {
        friends: state.users.friends,
        currentUser: { id: userId },
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getUserFriends: (id) => dispatch(usersActions.getAllUserFriends(id)),
        closeRecommendBookModal: () => dispatch(modalsActions.closeRecommendBookModal()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendBookModal);
