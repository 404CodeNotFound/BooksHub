import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import * as reviewsActions from '../../../actions/reviews.actions';

const postedOnStyle = {
    fontSize: "1rem"
};

class ReviewsList extends Component {
    state = { activePage: 1 };

    componentDidMount() {
        this.props.getReviews(this.props.userId, 1);
    }

    render() {
        return (
            [
                <div key="title" className="line text-center">
                    <i className="icon-sli-speech text-primary text-size-40"></i>
                    <h2 className="text-dark text-size-40 text-m-size-30">{this.props.title}</h2>
                    <hr className="break background-primary break-small break-center margin-bottom-50" />
                </div>,
                this.props.reviews.length > 0 ?
                    <div key="list" className="margin2x">
                        {this.props.reviews.map(review =>
                            <div key={review._id} className="row review">
                                <div className="col-xs-12 col-md-12">
                                    <div className="mbr-testimonial card">
                                        <div className="card-block">
                                            {this.props.isMyProfile &&
                                                <button className="btn-xs delete-review" onClick={(event) => this.props.deleteReview(this.props.userId, review._id)}>
                                                    <i className="fa fa-trash-o"></i>
                                                </button>
                                            }
                                            <p>{review.content}</p>
                                            <p style={postedOnStyle}>Posted on {review.posted_on}</p>
                                        </div>
                                        <div className="for-book">
                                            for
                                            <Link to={"/books/" + review.book._id}> {review.book.title}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {this.props.reviews.length > 0 &&
                            <div key="pages" className="row">
                                <Pagination
                                    activePage={this.state.activePage}
                                    itemsCountPerPage={8}
                                    totalItemsCount={this.props.reviewsCount}
                                    pageRangeDisplayed={5}
                                    onChange={this.selectPage}
                                />
                            </div>
                        }
                    </div> :
                    <div key="no-items" className="no-items">You have no reviews yet.</div>
            ]
        );
    }

    selectPage = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        this.props.getReviews(this.props.userId, pageNumber);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        reviews: state.users.reviews,
        reviewsCount: state.users.reviewsCount,
        userId: ownProps.userId,
        isMyProfile: ownProps.isMyProfile
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getReviews: (id, page) => dispatch(reviewsActions.getUserReviews(id, page)),
        deleteReview: (userId, reviewId) => dispatch(reviewsActions.deleteReview(userId, reviewId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsList);