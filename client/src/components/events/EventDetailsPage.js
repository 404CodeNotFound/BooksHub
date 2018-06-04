import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { BarLoader } from 'react-css-loaders';
import * as modalsActions from '../../actions/modals.actions';
import * as eventsActions from '../../actions/events.actions';
import * as loadersActions from '../../actions/loaders.actions';
import '../../style/event.details.css';
import AllParticipantsList from './AllParticipantsList';
import WriteComment from './WriteComment';
import EventCommentsList from './EventCommentsList';

class EventDetailsPage extends Component {
    state = {
        shouldRedirect: false
    }

    componentDidMount() {
        this.props.showLoader();
        this.props.getEvent();
    }

    render() {
        return (
                <article>
                    <header className="section background-image text-center">
                        <h1 className="animated-element slow text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-50 text-line-height-1 margin-bottom-30 margin-top-130">
                            Event Details
                      </h1>
                        <img className="arrow-object" src="../img/arrow-object-white.svg" alt="arrow" />
                    </header>

                    <div className="container">
                        {this.props.isLoaderVisible ? 
                        <div className="loader-page">
                            <BarLoader color="#4eb980" size="11" />
                        </div>
                        :
                        <section className="background-white section">
                            <div className="row animated animation-done bounceInRight text-center" id="event-title-section">
                                <div className="text-center col-md-12">
                                <h2>{this.props.event.title}</h2>
                                <h4>
                                    by
                                    <b>
                                        <Link to={"/users/" + this.props.event.creator.username} className="green-link"> {this.props.event.creator.username}</Link>
                                    </b>
                                </h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <img className="img-thumbnail" width="400px" alt="" src={this.props.event.photo} />
                                </div>
                                <div className="col-md-6">
                                    <dl className="dl-horizontal">
                                        <dt>
                                            Start
                                        </dt>
            
                                        <dd>
                                            <span>
                                                <i className="fa fa-calendar" aria-hidden="true"></i> {this.props.event.start_date ? this.props.event.start_date.split('T')[0] : "-"}
                                            </span>
                                            <br />
                                            <span>
                                                <i className="fa fa-clock-o" aria-hidden="true"></i> {this.props.event.start_date ? this.props.event.start_date.split('T')[1].split(":")[0] + ":" + this.props.event.start_date.split('T')[1].split(":")[1] : ""}
                                            </span>
                                        </dd>
            
                                        <dt>
                                            End
                                        </dt>
            
                                        <dd>
                                        <span>
                                            <i className="fa fa-calendar" aria-hidden="true"></i> {this.props.event.end_date ? this.props.event.end_date.split('T')[0] : "-"}
                                        </span>
                                        <br />
                                        <span>
                                            <i className="fa fa-clock-o" aria-hidden="true"></i> {this.props.event.end_date ? this.props.event.end_date.split('T')[1].split(":")[0] + ":" + this.props.event.end_date.split('T')[1].split(":")[1] : ""}
                                        </span>
                                        </dd>
            
                                        <dt>
                                            City/Town
                                        </dt>
            
                                        <dd>
                                            {this.props.event.city ? this.props.event.city : "-"}
                                        </dd>
            
                                        <dt>
                                            Place
                                        </dt>
            
                                        <dd>
                                            {this.props.event.place ?
                                            <div>
                                                {this.props.event.place} <button id="link-to-map" onClick={event => this.handleScrollToElement(event, "address")}><i className="fa fa-map-marker"></i> See on map</button>
                                            </div>
                                            : 
                                            "-"
                                            }
                                            
                                        </dd>
            
                                        <dt>
                                            Book
                                        </dt>
            
                                        <dd>
                                            {this.props.event.book ? this.props.event.book.title : "-"}
                                        </dd>
                                        <dt>
                                            Genres
                                        </dt>
                                        <dd>
                                            {this.props.event.genres.map(genre =>
                                                <span key={genre._id}>{genre.name} </span>
                                            )}
                                        </dd>
                                    </dl>
                                    {this.props.currentUser.username && this.props.canJoinEvent &&
                                        <div className="col-lg-3 col-md-3 col-sm-10 col-xs-12 no-padding">
                                            <button type="button" className="btn-main-sm col-lg-10 col-md-10 col-sm-12 col-xs-12" onClick={() => this.props.joinEvent(this.props.event._id, this.props.currentUser)}>Join event </button>
                                        </div>
                                    }
                                    <div id="stat-message"></div>
                                    
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 no-padding joined-friends">
                                        <div className="media">
                                            {this.props.event.participants.slice(0, 3).map(participant => 
                                                <Link key={participant._id} to={"/users/" + participant.username} className="green-link">
                                                    <img className="media-object dp img-circle" alt={participant.username} title={participant.username} src={participant.photo} />
                                                </Link>
                                            )}
                                            
                                            {this.props.event.participants.length > 0 &&
                                                <div>
                                                    {this.props.currentUser.username ?
                                                    <div id="joined-users-text">and {this.props.event.participants.length - 3 > 0 ? this.props.event.participants.length - 3 : ""} <a onClick={this.props.openAllParticipantsModal}>more</a> friends are going to the event.</div>
                                                    :
                                                    <div id="joined-users-text">and {this.props.event.participants.length - 3 > 0 ? this.props.event.participants.length - 3 : ""} <a onClick={this.props.openAllParticipantsModal}>more</a> people are going to the event.</div>
                                                    }
                                                    {this.props.isParticipantsModalVisible &&
                                                        <AllParticipantsList participants={this.props.event.participants} />
                                                    }
                                                </div>
                                            }
                                            
                                            <div className="media-body">
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="row description">
                                {this.props.event.details ? this.props.event.details : "-"}
                            </div>

                            <hr />

                            <section className="row map" id="address">
                                <div className="col-md-9 md-offset-4">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.2445257412037!2d-83.38776768490345!3d33.960553980630905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f66d243f82a089%3A0x341662aad6b920ee!2sAvid+Bookshop+on+Prince+Ave.!5e0!3m2!1sbg!2sbg!4v1521896710502"
                                        width="100%" frameBorder="0" style={{border:0}} allowFullScreen title="map">
                                    </iframe>
                                </div>
                                <div className="col-md-3">
                                    {this.props.currentUser.username ?
                                        <div>
                                            <button className="btn-main-sm col-lg-10 col-md-10 col-sm-12 col-xs-12 text-center" id="write-comment" onClick={event => this.handleScrollToElement(event, "comment-form")}>
                                                <i className="fa fa-pencil"></i>Leave a comment
                                            </button>
                                        </div>
                                        :
                                        <div>
                                            {this.redirect()}                                        
                                            <button className="btn-main-sm col-lg-10 col-md-10 col-sm-12 col-xs-12 text-center" id="write-comment" onClick={this.handleRedirect}>
                                                <i className="fa fa-pencil"></i>Leave a comment
                                            </button>
                                        </div>
                                    }
                                                                
                                    <div>
                                        <button className="btn-main-sm col-lg-10 col-md-10 col-sm-12 col-xs-12 text-center" id="see-comments" onClick={event => this.handleScrollToElement(event, "comments")}>
                                            <i className="fa fa-comment"></i>See all comments
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </section>
                        }
                    </div>
                    {this.props.currentUser.username &&
                        <WriteComment />
                    }
                    <EventCommentsList />
                </article>
        )
    }

    handleScrollToElement = (event, elementId) => {
        const node = document.getElementById(elementId);
        window.scrollTo(0, node.offsetTop);
    }

    handleRedirect = () => {
        this.setState({
          shouldRedirect: true
        });
    }

    redirect = () => {
        if (this.state.shouldRedirect) {
          return <Redirect to='/login' />
        }
    }
}

function mapStateToProps(state, ownProps) {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('id');

    return {
        event: state.events.event,
        currentUser: { username: username, id: userId },
        isLoaderVisible: state.loaders.showLoader,
        canJoinEvent: state.events.canJoinEvent,
        isParticipantsModalVisible: state.modals.showAllParticipantsModal
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    const userId = localStorage.getItem('id');
    
    return {
        getEvent: () => dispatch(eventsActions.getEventDetails(ownProps.match.params.id, userId)),
        joinEvent: (eventId, user) => dispatch(eventsActions.joinEvent(eventId, user)),
        openAllParticipantsModal: () => dispatch(modalsActions.openAllParticipantsModal()),  
        showLoader: () => dispatch(loadersActions.showLoader())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsPage);