import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as reviewsActions from '../../actions/reviews.actions';

class WriteReview extends Component {
    state = { reviewContent: '' }

    render() {
        return (
            <section className="section background-grey" id="review-form">
                <div className="line text-center">
                    <i className="icon-sli-pencil text-primary text-size-40"></i>
                    <h2 className="text-size-50 text-m-size-40">
                        Leave a Review</h2>
                    <hr className="break background-primary break-small break-center margin-bottom-50" />
                </div>
                <div className="container">
                    <form method="post" onSubmit={(event) => this.submitReview(event)}>
                        <textarea className="form-control col-md-6" id="review-content" name="Content"
                            placeholder="Write your review here..." rows="5" onChange={(event) => this.handleReviewChange(event)}>
                        </textarea>
                        <input type="submit" value="Leave review" id="post-review-btn" className="btn-main-sm btn-block col-md-4 offset-md-4" />
                    </form>
                </div>
            </section>
        )
    }

    handleReviewChange = (event) => {
        this.setState({ reviewContent: event.target.value });
    }

    submitReview = (event) => {
        event.preventDefault();
        const reviewContent = this.state.reviewContent;

        this.props.sendReview(reviewContent, this.props.book._id);
        this.setState({ author: '', text: '' });
    }
}

function mapStateToProps(state, ownProps) {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('id');

    return {
        book: state.books.book,
        currentUser: { username: username, id: userId }
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        sendReview: (content, bookId) => dispatch(reviewsActions.sendReview(content, bookId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WriteReview);