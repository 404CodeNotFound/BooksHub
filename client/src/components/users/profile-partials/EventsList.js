import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EventsList extends Component {
    render() {
        return (
            [
                <div key="events-title" className="row title">
                    <h3>{this.props.title}</h3>
                </div>,
                this.props.title === "Events Collection" && this.props.isMyProfile &&
                <button key="add-event" type="button" className="btn btn-main-green" id="create-event-btn" data-toggle="modal" data-target="#add-event-modal">
                    <i className="fa fa-plus"></i>Create event
                </button>,
                <div key="events-list" className="margin2x">
                    <div className="row">
                        {this.props.events.map(event =>
                            <div className="col-md-4 margin-bottom-60">
                                <div className="float-left">
                                    <img src={event.photo} height="200px" alt="event"/>
                                    <p>
                                        <h3 className="text-strong text-size-20 text-line-height-1 margin-bottom-20">{event.title}</h3>
                                        <h5>
                                            <small>by
                                                <Link href="profile.html" to={"/users/" + event.user.username}>{event.user.username}</Link>
                                            </small>
                                        </h5>
                                    </p>
                                    <p>
                                        {event.description.substr(0, 50)}...
                                        <Link className="text-more-info text-primary" to={"/events/" + event.title}>Read more</Link>
                                    </p>
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

export default EventsList;