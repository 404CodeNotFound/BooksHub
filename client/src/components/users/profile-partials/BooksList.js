import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BooksList extends Component {
    render() {
        return (
            [
                <div key="title" className="row title">
                    <h3>{this.props.title}</h3>
                </div>,
                <div key="books-list" className="margin2x">
                    <div className="row">
                        {this.props.books.map(book =>
                            <div className="col-md-4 margin-bottom-60">
                                <div className="float-left">
                                    <img src={book.photo} width="200px" alt="book-logo"/>
                                    <p>
                                        <h3 className="text-strong text-size-20 text-line-height-1 margin-bottom-20">{book.title}</h3>
                                        <h5>
                                            <small>by
                                                <a href="author.html">{book.user.username}</a>
                                            </small>
                                        </h5>
                                    </p>
                                    <p>
                                        {book.description.substr(0, 50)}...
                                        <Link className="text-more-info text-primary" to={"/books/" + book.title}>Read more</Link>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>,
                    <div key="pages" className="row">
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

export default BooksList;