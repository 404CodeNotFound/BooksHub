import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { BarLoader } from 'react-css-loaders';
import * as authorsActions from '../../actions/authors.actions';
import * as loadersActions from '../../actions/loaders.actions';
import '../../style/author.css';

class AuthorBiographyPage extends Component {
    componentWillMount() {
        this.props.showLoader();
        this.props.getAuthor();
    }

    render() {
        return (
            <article>
                <header className="section background-image text-center">
                    <h1 className="animated-element slow text-extra-thin text-white text-s-size-30 text-m-size-40 text-size-50 text-line-height-1 margin-bottom-30 margin-top-130">
                        Author Biography
                        </h1>
                    <img className="arrow-object" src="../img/arrow-object-white.svg" alt="arrow" />
                </header>
                {this.props.isLoaderVisible ?
                    <div className="loader-page">
                        <BarLoader color="#4eb980" size="11" />
                    </div>
                    :
                    [<div key="author-info" className="container">
                        <section className="background-white section">
                            <div className="row author-details">
                                <div className="panel panel-default">
                                    <div className="row panel-body">
                                        <div className="col-md-4 col-xs-12 col-sm-6 col-lg-4">
                                            <img alt="User Pic" src={this.props.author.photo} className="img-thumbnail img-responsive" />
                                        </div>
                                        <div className="col-md-10 md-offset-1 col-xs-12 col-sm-6 col-lg-8">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        <h2>{this.props.author.first_name} {this.props.author.last_name}</h2>
                                                    </div>
                                                </div>
                                                <p>
                                                    <i className="fa fa-envelope one"></i>
                                                    <a href={this.props.author.website} target="blank" className="green-link">{this.props.author.website || '-'}</a>
                                                </p>
                                            </div>
                                            <hr />
                                            <dl className="container details dl-horizontal">
                                                <dt>
                                                    Nationality
                                                </dt>

                                                <dd>
                                                    {this.props.author.nationality || '-'} </dd>

                                                <dt>
                                                    Age
                                                </dt>

                                                <dd>
                                                    {this.props.author.age || '-'} </dd>

                                                <dt>
                                                    Birth date
                                                </dt>
                                                <dd>
                                                    {this.props.author.birth_date ? this.props.author.birth_date.split('T')[0] || '-' : '-'}
                                                </dd>
                                                <dt>
                                                    Biography
                                                </dt>
                                                <dd>
                                                    {this.props.author.biography || '-'}
                                                </dd>
                                            </dl>
                                            <p>
                                                <a id="link-to-books" onClick={(event) => this.handleScrollToElement(event, "books-list")}>See all books by this author</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>,
                    <section key="author-books" className="section background-grey" id="books-list">
                        <div className="line text-center">
                            <i className="icon-sli-book-open text-primary text-size-40"></i>
                            <h2 className="text-size-50 text-m-size-40">
                                <strong>Books</strong> by this <strong>Author</strong></h2>
                            <hr className="break background-primary break-small break-center margin-bottom-50" />
                        </div>
                        <div className="container">
                            <div className="col-md-12 text-center">
                                <div className="row">
                                    {this.props.books.map(book =>
                                        <div key={book._id} className="card background-grey col-md-2">
                                            <Link to={"/books/" + book._id}>
                                                <img width="100px" className="card-img-top" src={book.photo} alt={"Card image cap " + book._id} />
                                            </Link>
                                            <div className="card-block background-grey">
                                                <h5 className="card-title">
                                                    <Link to={"/books/" + book._id} className="green-link">{book.title}</Link>
                                                </h5>
                                                <p className="card-text">
                                                    <small className="text-muted">{book.summary.substr(0, 60)}...</small>
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="row">

                                </div>
                            </div>
                        </div>
                    </section>
                    ]
                }
            </article>
        )
    }

    handleScrollToElement = (event, elementId) => {
        const node = document.getElementById(elementId);
        window.scrollTo(0, node.offsetTop);
    }

}

function mapStateToProps(state, ownProps) {
    debugger;
    return {
        author: state.authors.author,
        books: state.authors.author.books,
        isLoaderVisible: state.loaders.showLoader
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getAuthor: () => dispatch(authorsActions.getAuthorBiography(ownProps.match.params.id)),
        showLoader: () => dispatch(loadersActions.showLoader())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorBiographyPage);