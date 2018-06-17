import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as commentsActions from '../../actions/comments.actions';

class WriteComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentContent: ''
        };
    }

    render() {
        return (
            <section className="section background-grey" id="comment-form">
                <div className="line text-center">
                    <i className="icon-sli-pencil text-primary text-size-40"></i>
                    <h2 className="text-size-50 text-m-size-40">
                        Leave a Comment</h2>
                    <hr className="break background-primary break-small break-center margin-bottom-50" />
                </div>
                <div className="container">
                    <textarea className="form-control col-md-6" id="review-content" name="Content"
                        placeholder="Write your comment here ..." value={this.state.commentContent} rows="5" onChange={this.handleCommentChange}>
                    </textarea>
                    <input type="submit" value="Leave comment" id="post-review-btn" className="btn-main-sm btn-block col-md-4 offset-md-4" onClick={this.handleSubmit} />
                </div>
            </section>
        )
    }

    handleScrollToElement = (elementId) => {
        const node = document.getElementById(elementId);
        window.scrollTo(0, node.offsetTop);
    }

    handleCommentChange = (event) => {
        this.setState({ commentContent: event.target.value });
    }

    handleSubmit = () => {
        this.props.writeComment(this.state.commentContent, this.props.eventId);
        
        this.setState({ commentContent: '' });
        this.handleScrollToElement("comments");
    }
}

function mapStateToProps(state, ownProps) {
    return {
        eventId: state.events.event._id,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        writeComment: (content, eventId) => dispatch(commentsActions.writeComment(content, eventId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteComment);