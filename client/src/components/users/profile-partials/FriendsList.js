import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import * as usersActions from '../../../actions/users.actions';

class FriendsList extends Component {
    state = { activePage: 1 };
    
    render() {
        return (
            [
                <div key="friends-title" className="row title">
                    <h3>{this.props.title}</h3>
                </div>,
                <div key="friends-list">
                    <div className="row">
                        {this.props.users.map(user =>
                            <div key={user._id} className="col-md-1 margin-bottom-60">
                                <div className="float-left user">
                                    <Link to={"/users/" + user.username}>
                                        <img src={user.photo} width="200px" className="img-circle" alt="avatar" />
                                        <p>{user.first_name} {user.last_name}</p>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>,
                    <div key="pages" className="row">
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={18}
                            totalItemsCount={this.props.friendsCount}
                            pageRangeDisplayed={5}
                            onChange={this.selectPage}
                        />
                    </div>
                </div>
            ]
        );
    }

    selectPage = (pageNumber) => {
        this.setState({activePage: pageNumber});
        this.props.getNextPage(this.props.userId, pageNumber);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        users: state.users.friends,
        friendsCount: state.users.friendsCount,
        userId: ownProps.userId
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getNextPage: (userId, page) => dispatch(usersActions.getFriends(userId, page)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);