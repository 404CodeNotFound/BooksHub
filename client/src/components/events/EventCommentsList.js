import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class EventCommentsList extends Component {
    render() {
        return (
            <section className="section background-white" id="comments">
                <div className="line text-center">
                    <i className="icon-sli-speech text-primary text-size-40"></i>
                    <h2 className="text-size-50 text-m-size-40">
                        Comments
                    </h2>
                    <hr className="break background-primary break-small break-center margin-bottom-50" />
                </div>
                {this.props.event.comments.map(comment =>
                    <div key={comment._id} className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="mbr-testimonial card">
                                <div className="card-block">
                                    <p className="comment">{comment.content}</p>
                                    <p className="date-posted">Posted on {comment.posted_on.split('T')[0]}</p>
                                </div>
                                <div className="mbr-author card-footer">
                                    <div className="mbr-author-name">
                                        by
                                        <Link to={"/users/" + comment.user.username} className="green-link">
                                            <img src={comment.user.photo} id="review-user-img" alt="" className="img-circle" width="2%" />
                                        </Link>
                                        <Link to={"/users/" + comment.user.username}>{comment.user.username}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        event: state.events.event
    };
}

export default connect(mapStateToProps)(EventCommentsList);