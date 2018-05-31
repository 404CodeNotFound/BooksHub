import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import * as usersActions from '../../../actions/users.actions';

class FriendsList extends Component {
    state = { activePage: 1 };

    componentDidMount() {
        this.props.getFriends(this.props.userId, 1);
    }

    render() {
        return (
            [
                <div key="title" className="line text-center">
                    <i className="icon-user-following text-primary text-size-40"></i>
                    <h2 className="text-dark text-size-40 text-m-size-30">{this.props.title}</h2>
                    <hr className="break background-primary break-small break-center margin-bottom-50" />
                </div>,
                <div key="friends-list">
                    {this.props.users.length > 0 ?
                        [<div key="friends" className="row">
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
                                itemsCountPerPage={96}
                                totalItemsCount={this.props.friendsCount}
                                pageRangeDisplayed={5}
                                onChange={this.selectPage}
                            />
                        </div>]
                        :
                        <div key="no-items" className="no-items">You have no friends yet.</div>
                    }
                </div>
            ]
        );
    }

    selectPage = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        this.props.getFriends(this.props.userId, pageNumber);
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
        getFriends: (userId, page) => dispatch(usersActions.getFriends(userId, page)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);