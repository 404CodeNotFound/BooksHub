import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ParticipantPartial extends Component {
    render() {
        return (
            <div class="col-md-4 col-sm-6">
                <div class="friend-card">
                    <div class="card-info">
                        <img src={this.props.participant.photo} alt="user" class="profile-photo-lg" />
                        <div class="friend-info">
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
