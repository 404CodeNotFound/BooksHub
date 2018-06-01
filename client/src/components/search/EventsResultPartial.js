import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as eventsActions from '../../actions/events.actions';
import * as genresActions from '../../actions/genres.actions';
import '../../style/search.css';

class EventsResultPartial extends Component {
    componentDidMount() {
        this.props.getAllGenres();        
    }

    render() {
        return (
            <div className="panel container" id="search-results-events">
                <div className="row">
                    <div className="col-md-3 filters">
                        <div className="filter">
                            <div className="row">
                                <h4>Filter by Genre:</h4>
                            </div>
                            {this.props.genres.map(genre => 
                                <div key={genre._id} className="row checkbox checkbox-success">
                                    <input id={genre.name} type="checkbox" />
                                    <label htmlFor={genre.name}>
                                        {genre.name}
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h3>Found Events</h3>
                        <div className="row">
                            {this.props.events.map(event =>
                            <div key={event._id} className="card col-md-4">
                                <Link to={"/events/" + event._id}>
                                    <img height="100px" className="card-img-top img-thumbnail" src={event.photo}
                                        alt="Card image cap" />
                                </Link>
                                <div className="card-block">
                                    <h4 className="card-title">
                                        <Link to={"/events/" + event._id}>{event.title}</Link>
                                    </h4>
                                    <p className="card-text">
                                        <i className="fa fa-calendar"></i> {event.start_date ? event.start_date.split('T')[0] : ''}
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            <i className="fa fa-map-marker"></i> {event.place}, {event.city}</small>
                                    </p>
                                </div>
                            </div>
                            )}
                        </div>
                        <div className="row">
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
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        genres: state.administration.genres,        
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getAllGenres: () => dispatch(genresActions.getAllGenres()),        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsResultPartial);