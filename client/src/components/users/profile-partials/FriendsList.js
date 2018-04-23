import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FriendsList extends Component {
    render() {
        return (
            [
                <div key="friends-title" className="row title">
                    <h3>{this.props.title}</h3>
                </div>,
                <div key="friends-list">
                    <div className="row">
                    {this.props.users.map(user => 
                        <div className="col-md-1 margin-bottom-60">
                        <div className="float-left user">
                            <Link to={"/users/" + user.username}>
                                <img src={user.photo} width="200px" className="img-circle" alt="avatar"/>
                                <p>{user.first_name} {user.last_name}</p>                                
                            </Link>
                        </div>
                    </div>
                    )} 
                    </div>,
                    <div key="pages" className="row">
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
                    </div>
                </div>
            ]
        );
    }
}

export default FriendsList;