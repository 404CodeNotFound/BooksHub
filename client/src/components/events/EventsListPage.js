import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventPartial from './EventPartial';
import AddEventModal from './common/AddEventModal';
import { BarLoader } from 'react-css-loaders';
import * as eventsActions from '../../actions/events.actions';
import * as loadersActions from '../../actions/loaders.actions';
import * as modalsActions from '../../actions/modals.actions';
import '../../style/events.list.css';

class EventsListPage extends Component {
    backgroundImage = {
        backgroundImage: "url(img/banner-blurred.jpg)"
    };

    componentDidMount() {
        this.props.showLoader();

        if (this.props.currentUser.id) {
            this.props.getRecommendedEvents();
        } else {
            this.props.getLatestEvents();
        }
    }

    render() {
        return (
            <article>
                <header className="section background-image text-center" style={this.backgroundImage}>
                    <h1 className="animated-element slow text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-50 text-line-height-1 margin-bottom-30 margin-top-130">
                        {this.props.currentUser.id ? "Recommended" : "Latest"} events
                        </h1>
                    <img className="arrow-object" src="img/arrow-object-white.svg" alt="arrow" />
                </header>
                <section className="section background-white">
                    {this.props.isLoaderVisible ?
                        <div className="loader-page">
                            <BarLoader color="#4eb980" size="11" />
                        </div> :
                        (this.props.events.length <= 0) ? 
                        <div className="row">
                            {this.props.currentUser.id &&
                            <button key="add-event" type="button" className="btn btn-main-green" id="create-event-btn" onClick={this.props.openAddEventModal}>
                                <i className="fa fa-plus"></i> Create new event
                            </button>
                            } There is no events.
                        </div> :
                        <div className="line">
                            {this.props.currentUser.id &&
                            <button key="add-event" type="button" className="btn btn-main-green" id="create-event-btn" onClick={this.props.openAddEventModal}>
                                <i className="fa fa-plus"></i> Create new event
                            </button>
                            }
                            {this.props.isVisibleAddEventModal &&
                                <AddEventModal />
                            }
                            <div className="row">
                                {
                                    this.props.events.map(event =>

                                    <EventPartial event={event} key={event._id} />
                                )}
                            </div>
                        </div>
                    }
                </section>
            </article>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('id');

    return {
        events: state.events.events,
        currentUser: { username: username, id: userId },
        isLoaderVisible: state.loaders.showLoader,
        isVisibleAddEventModal: state.modals.showAddEventModal,        
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        showLoader: () => dispatch(loadersActions.showLoader()),
        getRecommendedEvents: () => dispatch(eventsActions.getRecommendedEvents()),
        getLatestEvents: () => dispatch(eventsActions.getLatestEvents()),
        openAddEventModal: () => dispatch(modalsActions.openAddEventModal()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsListPage);