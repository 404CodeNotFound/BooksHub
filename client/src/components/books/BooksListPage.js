import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as booksActions from '../../actions/books.actions';
import BookPartial from './BookPartial';

class BooksListPage extends Component {
    backgroundImage = {
        backgroundImage: "url(img/banner-blurred.jpg)"
    };

    componentDidMount() {
        if (this.props.currentUser.id) {
            this.props.getRecommendedBooks();
        } else {
            this.props.getLatestBooks();
        }
    }

    render() {
        return (
            (this.props.recommendedBooks.length > 0 || this.props.latestBooks.length > 0) ?
                <article>
                    <header class="section background-image text-center" style={this.backgroundImage}>
                        <h1 class="animated-element slow text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-50 text-line-height-1 margin-bottom-30 margin-top-130">
                            {this.props.currentUser.id ? "Recommended" : "Latest"} books
              </h1>
                        <img class="arrow-object" src="img/arrow-object-white.svg" alt="arrow" />
                    </header>
                    <section class="section background-white">
                        <div class="line row">
                            {this.props.recommendedBooks.length > 0 &&
                                this.props.recommendedBooks.map(book =>
                                    <BookPartial book={book} />
                                )
                            }

                            {this.props.latestBooks.length > 0 &&
                                this.props.latestBooks.map(book =>
                                    <BookPartial book={book} />
                                )
                            }
                        </div>
                    </section>
                </article>
                :
                <div className="loader"></div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('id');

    return {
        recommendedBooks: state.books.recommendedBooks,
        latestBooks: state.books.latestBooks,
        currentUser: { username: username, id: userId },
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getRecommendedBooks: () => dispatch(booksActions.getRecommendedBooks()),
        getLatestBooks: () => dispatch(booksActions.getLatestBooks())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksListPage);