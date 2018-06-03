import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ParticipantPartial extends Component {
    render() {
        return (
            <div className="col-md-4 col-sm-6">
                <div className="friend-card">
                    <div className="card-info">
                        <img src={this.props.participant.photo} alt="user" className="profile-photo-lg" />
                        <div className="friend-info">
                            <h5>
                                <Link to={"/users/" + this.props.participant.username} className="profile-link">{this.props.participant.username}</Link>
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(ParticipantPartial);
