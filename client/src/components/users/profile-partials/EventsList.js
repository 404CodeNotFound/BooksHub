import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import * as eventsActions from '../../../actions/events.actions';

class EventsList extends Component {
    state = { activePage: 1 };

    componentDidMount() {
        if (this.props.title === 'Events Collection') {
            this.props.getUserEvents(this.props.userId, 1);
        } else {
            this.props.getJoinedEvents(this.props.userId, 1);
        }
    }

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
                            <div key={event._id} className="col-md-4 margin-bottom-60">
                                <div className="float-left">
                                    <img src={event.photo} height="200px" alt="event" />
                                    <div>
                                        <h3 className="text-strong text-size-20 text-line-height-1 margin-bottom-20">{event.title}</h3>
                                        <h5>
                                            <small>by
                                                <Link href="profile.html" to={"/users/" + event.creator.username}> {event.creator.username}</Link>
                                            </small>
                                        </h5>
                                    </div>
                                    <p>
                                        {event.details.substr(0, 50)}...
                                        <Link className="text-more-info text-primary" to={"/events/" + event.title}>Read more</Link>
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>,
                    {this.props.events.length > 0 &&
                        <div key="pages" className="row">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={1}
                                totalItemsCount={this.props.eventsCount}
                                pageRangeDisplayed={5}
                                onChange={this.selectPage}
                            />
                        </div>
                    }
                </div>
            ]
        );
    }

    selectPage = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        if (this.props.title === 'Events Collection') {
            this.props.getUserEvents(this.props.userId, pageNumber);
        } else {
            this.props.getJoinedEvents(this.props.userId, pageNumber);
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        events: state.users.events,
        eventsCount: state.users.eventsCount
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getUserEvents: (id, page) => dispatch(eventsActions.getUserEvents(id, page)),
        getJoinedEvents: (id, page) => dispatch(eventsActions.getJoinedEvents(id, page))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);