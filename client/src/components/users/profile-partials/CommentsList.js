import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const postedOnStyle = {
    fontSize: "1rem"
};

class CommentsList extends Component {
    render() {
        return (
            [
                <div key="title" className="row title">
                    <h3>{this.props.title}</h3>
                </div>,
                <div key="list" className="margin2x">
                    {this.props.comments.map(comment =>
                        <div className="row review">
                            <div className="col-xs-12 col-md-12">
                                <div className="mbr-testimonial card">
                                    <div className="card-block">
                                        {this.props.isMyProfile &&
                                            <button className="btn-xs delete-review">
                                                <i className="fa fa-trash-o"></i>
                                            </button>
                                        }
                                        <p>{comment.content}</p>
                                        <p style={postedOnStyle}>Posted on {comment.posted_on}</p>
                                    </div>
                                    <div className="for-book">
                                        for
                                    {this.props.title === 'Reviews Collection' ?
                                            <Link to={"/books/" + comment.book.title}>{comment.book.title}</Link> :
                                            <Link to={"/events/" + comment.event.title}>{comment.event.title}</Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
            ]
        );
    }
}

export default CommentsList;