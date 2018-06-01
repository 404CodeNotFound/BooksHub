import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class UsersResultPartial extends Component {
    render() {
        return (
            <div className="panel container" id="search-results-users">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Found users</h3>
                        <div className="users">
                            <div className="row">
                                {this.props.users.map(user => 
                                    <div key={user._id} className="col-md-2 col-sm-4 col-xs-2 text-center">
                                        <Link to={"/users/" + user.username}>
                                            <img src={user.photo} className="img-circle" alt={user.username} styles="width: 70px;" />
                                        </Link>
                                        <p>
                                            <Link to={"/users/" + user.username}>{user.username}</Link>
                                        </p>
                                    </div>
                                )}
                                
                            </div>
                            {/* <div className="row">
                                <div className="col-md-offset-5 pages total center">
                                    Page 1 of 1
                                    <div className="pagination-container center">
                                        <ul className="pagination">
                                            <li className="active">
                                                <a>1</a>
                                            </li>
                                            <li>
                                                <a>2</a>
                                            </li>
                                            <li>
                                                <a>3</a>
                                            </li>
                                            <li>
                                                <a>4</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(UsersResultPartial);