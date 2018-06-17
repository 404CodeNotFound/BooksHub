import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as usersActions from '../../actions/users.actions';

class FriendPartial extends Component {
    state = {
        showRecommendButton: true,
    };

    render() {
        return (
            <div className="col-md-4 col-sm-6">
                <div className="friend-card">
                    <div className="card-info">
                        <img src={this.props.friend.photo} alt="user" className="profile-photo-lg" />
                        <div className="friend-info">
                            <h5>
                                <Link to={"/users/" + this.props.friend.username} className="profile-link">{this.props.friend.username}</Link>
                            </h5>
                            {this.state.showRecommendButton &&
                                <button type="button" className="btn btn-warning" onClick={this.handleRecommend}>Recommend</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleRecommend = () => {
        this.props.recommendBook(this.props.friend._id, this.props.bookId);

        this.setState({
            showRecommendButton: false
        });
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        recommendBook: (userId, bookId) => dispatch(usersActions.recommendBook(userId, bookId))
    };
}

export default connect(null, mapDispatchToProps)(FriendPartial);
