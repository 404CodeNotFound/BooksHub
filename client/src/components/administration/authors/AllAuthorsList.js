import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authorsActions from '../../../actions/authors.actions';
import Pagination from "react-js-pagination";
import AuthorRow from './AuthorRow';

class AllAuthorsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
    }

    componentDidMount() {
        this.props.getAllAuthors(this.state.activePage);
    }

    render() {
        return (
            <div id="page-content-wrapper administration-box" key="authors-list">
                <div id="authors">
                    <h2>Authors</h2>
                    <button type="button" className="btn btn-main-green">+ Add</button>
                    {this.props.authors.length > 0 &&
                        [
                        <table key="authors-table" className="table">
                            <tbody>
                                <tr>
                                    <th>
                                        PhotoUrl
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Nationality
                                    </th>
                                    <th>
                                        Birth Date
                                    </th>
                                    <th>
                                        Website
                                    </th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                {this.props.authors.map(author =>
                                    <AuthorRow key={author._id} author={author} />
                                )}
                            </tbody>
                        </table>,
                    
                        <div key="pages" className="row">
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={10}
                                totalItemsCount={this.props.authorsCount}
                                pageRangeDisplayed={5}
                                onChange={this.selectPage}
                            />
                        </div>]
                    }
                    
                </div>
            </div>
        )
    }

    selectPage = (page) => {
        this.setState({ activePage: page });
        this.props.getAllAuthors(page);
    }
}

function mapStateToProps(state, ownProps) {
    return {
        authors: state.administration.authors,
        authorsCount: state.administration.authorsCount
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getAllAuthors: (page) => dispatch(authorsActions.getAllAuthors(page)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllAuthorsList);