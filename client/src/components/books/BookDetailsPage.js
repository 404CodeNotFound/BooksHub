import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import WriteReview from './WriteReview';
import BookReviewsList from './BookReviewsList';
import * as booksActions from '../../actions/books.actions';
import '../../style/book.details.css';

class BookDetailsPage extends Component {
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
                                            <form id="rating-form" method="post">
                                                <fieldset className="rating">
                                                    <input type="radio" value="5"/>
                                                    <label className={this.shouldBeMarked(5) ? 'marked-star' : ''} title="Rocks!" value='5' onClick={() => this.handleRateBook(5)}></label>

                                                    <input type="radio" value="4" />
                                                    <label className={this.shouldBeMarked(4) ? 'marked-star' : ''} title="Pretty good" onClick={() => this.handleRateBook(4)}></label>

                                                    <input type="radio" value="3" />
                                                    <label className={this.shouldBeMarked(3) ? 'marked-star' : ''} title="Meh" onClick={() => this.handleRateBook(3)}></label>

                                                    <input type="radio" value="2" />
                                                    <label className={this.shouldBeMarked(2) ? 'marked-star' : ''} title="Kinda bad" onClick={() => this.handleRateBook(2)}></label>

                                                    <input type="radio" value="1" />
                                                    <label className={this.shouldBeMarked(1) ? 'marked-star' : ''} title="Sucks big time" onClick={() => this.handleRateBook(1)}></label>
                                                </fieldset>
                                            </form>
                                        </div>,
                                        this.props.canWriteReview &&
                                        <div key="mark" className="row" id="write-review-link">
                                            <button className="btn-main-sm" onClick={event => this.handleScrollToElement(event, "review-form")}>
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
                                            <Link to={"/authors/" + this.props.book.author._id} className="green-link"> {this.props.book.author.first_name} {this.props.book.author.last_name}</Link>
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
                                            <form className="col-md-3 col-sm-12" id="status-form">
                                                <select defaultValue={this.props.bookStatus} className="btn-main-sm" name="CurrentStatus" id="mark-book" onChange={(event) => this.markBook(event)}>
                                                    <option value="CurrentlyReading">Currently Reading</option>
                                                    <option value="Read">Read</option>
                                                    <option value="WantToRead">Want To Read</option>
                                                </select>
                                            </form>
                                        }
                                        <div id="stat-message"></div>
                                        <button className="btn-main-sm col-md-3 col-sm-12" id="all-reviews-link" onClick={event => this.handleScrollToElement(event, "reviews")}>
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
                        <WriteReview />
                    }
                    <BookReviewsList />
                </article>
                :
                <div className="loader"></div>
        )
    }

    handleScrollToElement = (event, elementId) => {
        const node = document.getElementById(elementId);
        window.scrollTo(0, node.offsetTop);
    }

    handleRateBook = (rating) => {
        this.props.rateBook(this.props.book._id, this.props.currentUser.id, rating);
    }

    shouldBeMarked = (rating) => {
        return rating <= this.props.currentUserRating;
    }

    markBook = (event) => {
        const markedAs = event.target.value;
        this.props.markBook(this.props.book._id, this.props.currentUser.id, markedAs);
    }
}

function mapStateToProps(state, ownProps) {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('id');

    return {
        book: state.books.book,
        currentUser: { username: username, id: userId },
        canWriteReview: state.books.canWriteReview,
        currentUserRating: state.books.currentUserRating,
        bookStatus: state.books.bookStatus
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    const userId = localStorage.getItem('id');
    return {
        getBookDetails: () => dispatch(booksActions.getBookDetails(ownProps.match.params.title, userId)),
        rateBook: (bookId, userId, rating) => dispatch(booksActions.rateBook(userId, bookId, rating)),
        markBook: (bookId, userId, status) => dispatch(booksActions.markBook(bookId, userId, status))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsPage);