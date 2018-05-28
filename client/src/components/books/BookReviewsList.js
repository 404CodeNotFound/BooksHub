import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class BookReviewsListPage extends Component {
    render() {
        return (
            <section className="section background-white" id="reviews">
                <div className="line text-center">
                    <i className="icon-sli-speech text-primary text-size-40"></i>
                    <h2 className="text-size-50 text-m-size-40">
                        Reviews</h2>
                    <hr className="break background-primary break-small break-center margin-bottom-50" />
                </div>
                {this.props.book.reviews.map(review =>
                    <span key={review._id}>
                        <div key={review._id} className="review row">
                            <div className="col-md-2 col-xs-2">
                                <Link to={"/users/" + review.user.username + "/information"}>
                                    <img className="img-responsive" src={review.user.photo} alt={"user-photo-" + review.user.username} />
                                </Link>
                            </div>
                            <div className="col-md-10 col-xs-10">
                                <blockquote>
                                    {review.content}
                                    <cite>
                                        <span><Link to={"/users/" + review.user.username + "/information"} className="green-link">{review.user.username} </Link></span>
                                        <span>for </span>
                                        <span><Link to={"/books/" + this.props.book._id} className="green-link"> {this.props.book.title}</Link></span>
                                    </cite>
                                </blockquote>
                            </div>
                        </div>
                        <hr key={"line " + review._id} />
                    </span>
                )}

            </section>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        book: state.books.book
    };
}

export default connect(mapStateToProps)(BookReviewsListPage);