import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BookPartial extends Component {
    render() {
        return (
            <div className="col-md-3 margin-bottom-60">
                <div className="float-left">
                    <Link to={"/books/" + this.props.book.title}>
                        <img src={this.props.book.photo} width="200px" alt={this.props.book._id} />
                    </Link>
                    <div>
                        <Link to={"/books/" + this.props.book.title}>
                            <h3 className="text-strong text-size-20 text-line-height-1 margin-bottom-20">{this.props.book.title}</h3>
                        </Link>
                        <h5>
                            <small>by
                                <Link to={"/authors/" + this.props.book.author._id} className="green-link"> {this.props.book.author.first_name} {this.props.book.author.last_name}</Link>
                            </small>
                        </h5>
                    </div>
                    <p>
                        {this.props.book.summary.substr(0, 50)}...
                      <Link className="text-more-info text-primary" to={"/books/" + this.props.book.title}>Read more</Link>
                    </p>
                </div>
            </div>
        );
    }
};

export default BookPartial;

