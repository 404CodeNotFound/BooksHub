import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import * as eventsActions from '../../../actions/events.actions';
import * as modalsActions from '../../../actions/modals.actions';
import AddEventModal from '../../events/common/AddEventModal';
import EditEventModal from '../../events/common/EditEventModal';
import * as constants from '../../../utils/constants';

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
                <div key="title" className="line text-center">
                    <i className="icon-sli-calendar text-primary text-size-40"></i>
                    <h2 className="text-dark text-size-40 text-m-size-30">{this.props.title}</h2>
                    <hr className="break background-primary break-small break-center margin-bottom-50" />
                </div>,
                this.props.title === "Events Collection" && (this.props.userId === this.props.currentUser.id) &&
                <button key="add-event" type="button" className="btn btn-main-green" id="create-event-btn" onClick={this.props.openAddEventModal}>
                    <i className="fa fa-plus"></i> New
                </button>,
                <div key="events-list" className="margin2x">
                    <div className="row">
                        {this.props.events.map(event =>
                            <div key={event._id} className="col-md-3 margin-bottom-60">
                                <div className="float-left">
                                    {event.creator._id === this.props.currentUser.id && (this.props.userId === this.props.currentUser.id) ?
                                    <div className="event-cover">
                                        <img src={event.photo} height="200px" alt="event" />
                                        <div>
                                            <i className="fa fa-trash fa-2x" aria-hidden="true" onClick={() => this.props.deleteEvent(event._id, false)}></i>
                                            <i className="fa fa-pencil fa-2x" aria-hidden="true" onClick={() => this.props.openEditEventModal(event)}></i>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <img src={event.photo} height="200px" alt="event" />
                                    </div>
                                    }
                                    
                                    <div>
                                        <Link to={"/events/" + event._id}>
                                        <h3 className="text-strong text-size-20 text-line-height-1 margin-bottom-20">{event.title}</h3>
                                        </Link>
                                        <h5>
                                            <small>by
                                                <Link to={"/users/" + event.creator.username}> {event.creator.username}</Link>
                                            </small>
                                        </h5>
                                    </div>
                                    <div>
                                        {event.details.substr(0, 50)}...                                        
                                        <Link className="text-more-info text-primary" to={"/events/" + event._id}>Read more</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                        {this.props.isVisibleEditEventModal &&
                            <EditEventModal />
                        }
                    </div>,
                    {this.props.events.length > 0 &&
                        <div key="pages" className="row">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={8}
                                totalItemsCount={this.props.eventsCount}
                                pageRangeDisplayed={5}
                                onChange={this.selectPage}
                            />
                        </div>
                    }
                </div>,
                <div key="add-event-modal">
                    {this.props.isVisibleAddEventModal &&
                    <AddEventModal page={constants.USER_PROFILE_PAGE} />
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
    let userId = localStorage.getItem('id');

    return {
        events: state.users.events,
        eventsCount: state.users.eventsCount,
        currentUser: { id: userId },
        isVisibleAddEventModal: state.modals.showAddEventModal,
        isVisibleEditEventModal: state.modals.showEditEventModal,        
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getUserEvents: (id, page) => dispatch(eventsActions.getUserEvents(id, page)),
        getJoinedEvents: (id, page) => dispatch(eventsActions.getJoinedEvents(id, page)),
        deleteEvent: (id, isAdminPage) => dispatch(eventsActions.deleteEvent(id, isAdminPage)),        
        openAddEventModal: () => dispatch(modalsActions.openAddEventModal()),
        openEditEventModal: (event) => dispatch(modalsActions.openEditEventModal(event)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);