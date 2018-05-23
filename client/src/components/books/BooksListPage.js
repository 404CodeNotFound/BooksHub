import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookPartial from './BookPartial';
import { BarLoader } from 'react-css-loaders';
import * as booksActions from '../../actions/books.actions';
import * as loadersActions from '../../actions/loaders.actions';

class BooksListPage extends Component {
    backgroundImage = {
        backgroundImage: "url(img/banner-blurred.jpg)"
    };

    componentDidMount() {
        this.props.showLoader();

        if (this.props.currentUser.id) {
            this.props.getRecommendedBooks();
        } else {
            this.props.getLatestBooks();
        }
    }

    render() {
        return (
            <article>
                <header className="section background-image text-center" style={this.backgroundImage}>
                    <h1 className="animated-element slow text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-50 text-line-height-1 margin-bottom-30 margin-top-130">
                        {this.props.currentUser.id ? "Recommended" : "Latest"} books
                        </h1>
                    <img className="arrow-object" src="img/arrow-object-white.svg" alt="arrow" />
                </header>
                <section className="section background-white">
                    <div className="container">
                        {this.props.isLoaderVisible ?
                            <div className="loader-page">
                                <BarLoader color="#4eb980" size="11" />
                            </div> :
                            (this.props.books.length <= 0) ? 
                            <div className="row">
                                There is no books.
                            </div> :
                            <div className="line row">
                                    {this.props.books.map(book =>
                                        <BookPartial book={book} key={book._id} />
                                    )}
                            </div>
                        }
                    </div>
                </section>
            </article>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('id');

    return {
        books: state.books.books,
        currentUser: { username: username, id: userId },
        isLoaderVisible: state.loaders.showLoader
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        showLoader: () => dispatch(loadersActions.showLoader()),
        getRecommendedBooks: () => dispatch(booksActions.getRecommendedBooks()),
        getLatestBooks: () => dispatch(booksActions.getLatestBooks())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksListPage);