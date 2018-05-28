import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import * as commentsActions from '../../../actions/comments.actions';

const postedOnStyle = {
    fontSize: "1rem"
};

class CommentsList extends Component {
    state = { activePage: 1 };

    componentDidMount() {
        this.props.getComments(this.props.userId, 1);
    }

    render() {
        console.log(this.props.comments);
        return (
            [
                <div key="title" className="line text-center">
                    <i className="icon-sli-speech text-primary text-size-40"></i>
                    <h2 className="text-dark text-size-40 text-m-size-30">{this.props.title}</h2>
                    <hr className="break background-primary break-small break-center margin-bottom-50" />
                </div>,
                <div key="list" className="margin2x">
                    {this.props.comments.map(comment =>
                        <div key={comment._id} className="row review">
                            <div className="col-xs-12 col-md-12">
                                <div className="mbr-testimonial card">
                                    <div className="card-block">
                                        {this.props.isMyProfile &&
                                            <button className="btn-xs delete-review" onClick={(event) => this.props.deleteComment(this.props.userId, comment._id)}>
                                                <i className="fa fa-trash-o"></i>
                                            </button>
                                        }
                                        <p>{comment.content}</p>
                                        <p style={postedOnStyle}>Posted on {comment.posted_on.split('T')[0]}</p>
                                    </div>
                                    <div className="for-book">
                                        for
                                            <Link to={"/events/" + comment.event._id}> {comment.event.title}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {this.props.comments.length > 0 &&
                        <div key="pages" className="row">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={1}
                                totalItemsCount={this.props.commentsCount}
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
        this.props.getComments(this.props.userId, pageNumber);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        comments: state.users.comments,
        commentsCount: state.users.commentsCount,
        userId: ownProps.userId,
        isMyProfile: ownProps.isMyProfile
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getComments: (id, page) => dispatch(commentsActions.getUserComments(id, page)),
        deleteComment: (userId, commentId) => dispatch(commentsActions.deleteComment(userId, commentId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);