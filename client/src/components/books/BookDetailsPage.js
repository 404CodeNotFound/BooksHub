import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as booksActions from '../../actions/books.actions';
import * as reviewsActions from '../../actions/reviews.actions';
import '../../style/book.details.css';

class BookDetailsPage extends Component {
    state = { reviewContent: '' }

    componentDidMount() {
        this.props.getBookDetails();
    }

    render() {
        return (
            this.props.book !== null ?
                <article>
                    <header className="section background-image text-center">
                        <h1 className="animated-element slow text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-50 text-line-height-1 margin-bottom-30 margin-top-130">
                            Book Details
                      </h1>
                        <img className="arrow-object" src="../img/arrow-object-white.svg" alt="arrow" />
                    </header>

                    <div className="container">
                        <section className="background-white section">
                            <div className="row col-md-12 book-info">
                                <div className="col-lg-4 col-md-7 col-sm-6 col-xs-12 animated  animation-done bounceInLeft book-cover">
                                    <img alt="Book Cover" src={this.props.book.photo} id="details-book-cover"
                                        className="img-thumbnail img-responsive" />
                                    {this.props.currentUser.username &&
                                        [<div key="rate" className="row" id="book-rating">
                                            <div className="col-md-4">
                                                Rate this book:
                              </div>
                                            <form action="/ratings" id="rating-form" method="post">
                                                <fieldset className="rating">
                                                    <input type="radio" value="5" />
                                                    <label title="Rocks!" rate-value='5'></label>

                                                    <input type="radio" value="4" />
                                                    <label title="Pretty good" rate-value='4'></label>

                                                    <input type="radio" value="3" />
                                                    <label title="Meh" rate-value='3'></label>

                                                    <input type="radio" value="2" />
                                                    <label title="Kinda bad" rate-value='2'></label>

                                                    <input type="radio" value="1" />
                                                    <label title="Sucks big time" rate-value='1'></label>
                                                </fieldset>
                                            </form>
                                        </div>,
                                        this.props.canWriteReview &&
                                        <div key="mark" className="row" id="write-review-link">
                                            <button className="btn-main-sm">
                                                <i className="fa fa-pencil"></i> Write review
                              </button>
                                        </div>
                                        ]}
                                </div>

                                <div className="col-lg-7 col-md-5 col-sm-6 col-xs-12 animated animation-done  bounceInRight">
                                    <h2 className="title">{this.props.book.title}</h2>
                                    <h4 className="title">
                                        by
                              <b>
                                            <Link to={"/authors/" + this.props.book.author.first_name + " " + this.props.book.author.last_name}> {this.props.book.author.first_name} {this.props.book.author.last_name}</Link>
                                        </b>
                                    </h4>
                                    <hr />
                                    <div>
                                        {this.props.book.summary}
                                    </div>
                                    <dl className="dl-horizontal">
                                        <dt>
                                            Published
                              </dt>

                                        <dd>
                                            {this.props.book.date_published}
                                        </dd>

                                        <dt>
                                            ISBN
                              </dt>

                                        <dd>
                                            {this.props.book.isbn}
                                        </dd>

                                        <dt>
                                            Rating
                              </dt>

                                        <dd>
                                            {this.props.book.rating} <i className="fa fa-star star" aria-hidden="true"></i>
                                        </dd>

                                        <dt>
                                            Language
                              </dt>

                                        <dd>
                                            {this.props.book.language}
                                        </dd>
                                        <dt>
                                            Publisher
                              </dt>

                                        <dd>
                                            {this.props.book.publisher}
                                        </dd>
                                    </dl>
                                    <hr />
                                    <div>
                                        <b> Genres: </b>
                                        {this.props.book.genres.map(genre =>
                                            <span key={genre._id}>{genre.name} </span>
                                        )}
                                    </div>
                                    <hr />

                                    <div className="row buttons">
                                        {this.props.currentUser.username &&
                                            <form action="#" className="col-md-3 col-sm-12" id="status-form" method="post">
                                                <select defaultValue="2" className="btn-main-sm" name="CurrentStatus">
                                                    <option value="0">CurrentlyReading</option>
                                                    <option value="1">Read</option>
                                                    <option value="2">WantToRead</option>
                                                </select>
                                            </form>
                                        }
                                        <div id="stat-message"></div>
                                        <button className="btn-main-sm col-md-3 col-sm-12" id="all-reviews-link">
                                            <i className="fa fa-comments"></i> See reviews</button>
                                        {this.props.currentUser.username &&
                                            <button className="btn-main-sm col-md-3 col-sm-12">
                                                <i className="fa fa-user"></i> Recommend</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    {(this.props.currentUser.username && this.props.canWriteReview) &&
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
                    }
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
                                                <span><Link to={"/users/" + review.user.username + "/information"}>{review.user.username} </Link></span>
                                                <span>for </span>
                                                <span><Link to={"/books/" + this.props.book.title}> {this.props.book.title}</Link></span>
                                            </cite>
                                        </blockquote>
                                    </div>
                                </div>
                                <hr key={"line " + review._id} />
                            </span>
                        )}

                    </section>
                </article>
                :
                <div className="loader"></div>
        )
    }

    handleReviewChange = (event) => {
        this.setState({ reviewContent: event.target.value });
    }

    submitReview = (event) => {
        event.preventDefault();
        const reviewContent = this.state.reviewContent;

        this.props.sendReview(reviewContent, this.props.currentUser.id, this.props.book._id);
        this.setState({ author: '', text: '' });
    }
}

function mapStateToProps(state, ownProps) {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('id');

    return {
        book: state.books.book,
        currentUser: { username: username, id: userId },
        canWriteReview: state.books.canWriteReview
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    const userId = localStorage.getItem('id');
    return {
        getBookDetails: () => dispatch(booksActions.getBookDetails(ownProps.match.params.title, userId)),
        sendReview: (content, userId, bookId) => dispatch(reviewsActions.sendReview(content, userId, bookId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsPage);