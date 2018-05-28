import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EventPartial extends Component {
    render() {
        return (
            <div className="col-md-6">
              <div className="box-item">
                <div className="box-post">
                    {this.props.event.genres.map(genre => 
                        <span key={genre._id} className="label label-success">{genre.name}</span> 
                    )}
                    
                    <Link to={"/events/" + this.props.event._id}>
                        <h1 className="post-title">
                                {this.props.event.title}
                        </h1>
                    </Link>
                    <span className="meta">
                        <span>
                        <i className="fa fa-map-marker"></i> {this.props.event.place}, {this.props.event.city} </span>
                        <span>
                        <i className="fa fa-calendar"></i> {this.props.event.start_date.split('T')[0]} </span>
                    </span>
                </div>
                <Link to={"/events/" + this.props.event._id}>
                    <img src={this.props.event.photo} width="200px" alt={this.props.event._id} />
                </Link>
              </div>
            </div>
        );
    }
};

export default EventPartial;

