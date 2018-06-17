import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UsersResultPartial extends Component {
    render() {
        return (
            <div className="panel container" id="search-results-users">
                <div className="row">
                    <div className="col-md-12">
                        <div className="users">
                            <div className="row">
                                {this.props.users.length > 0 ?
                                    this.props.users.map(user =>
                                        <div key={user._id} className="col-md-2 col-sm-4 col-xs-2 text-center">
                                            <Link to={"/users/" + user.username}>
                                                <img src={user.photo} className="img-circle" alt={user.username} styles="width: 70px;" />
                                            </Link>
                                            <p>
                                                <Link to={"/users/" + user.username}>{user.username}</Link>
                                            </p>
                                        </div>
                                    ) :
                                    <p>No users were found.</p>
                                }

                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(UsersResultPartial);