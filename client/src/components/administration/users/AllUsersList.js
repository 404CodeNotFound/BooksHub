import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../../../actions/users.actions';
import Pagination from "react-js-pagination";
import UserRow from './UserRow';

class AllUsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
    }

    componentDidMount() {
        this.props.getAllUsers(this.state.activePage);
    }

    render() {
        return (
            <div id="page-content-wrapper administration-box" key="users-list">
                <div id="users">
                    <h2>Users</h2>
                    {this.props.users.length > 0 &&
                        [
                        <table key="users-table" className="table">
                            <tbody>
                                <tr>
                                    <th>
                                        PhotoUrl
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Username
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                        Nationality
                                    </th>
                                    <th>
                                        Birthdate
                                    </th>
                                    <th>
                                        Role
                                    </th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {this.props.users.map(user =>
                                    <UserRow key={user._id} user={user} />
                                )}
                            </tbody>
                        </table>,
                    
                        <div key="pages" className="row">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.usersCount}
                                pageRangeDisplayed={5}
                                onChange={this.selectPage}
                            />
                        </div>]
                    }
                    
                </div>
            </div>
        )
    }

    selectPage = (page) => {
        this.setState({ activePage: page });
        this.props.getAllUsers(page);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        users: state.administration.users,
        usersCount: state.administration.usersCount,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getAllUsers: (page) => dispatch(usersActions.getAllUsers(page)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsersList);