import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Pagination from "react-js-pagination";
import GenreRow from './GenreRow';
import AddGenreModal from './AddGenreModal';
import * as genresActions from '../../../actions/genres.actions';
import * as modalsActions from '../../../actions/modals.actions';

class AllGenresList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
    }

    componentDidMount() {
        this.props.getAllGenres(this.state.activePage);
    }

    render() {
        return (
            <div id="page-content-wrapper administration-box" key="authors-list">
                <div id="genres">
                    <h2>Genres</h2>
                    <button type="button" className="btn btn-main-green" onClick={this.props.openAddGenreModal}>+ Add</button>
                    {this.props.genres.length > 0 &&
                        <table key="genres-table" className="table">
                            <tbody>
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <th></th>
                                </tr>
                                {this.props.genres.map(genre =>
                                    <GenreRow key={genre._id} genre={genre} />
                                )}
                            </tbody>
                        </table>
                    }
                    
                </div>

                {this.props.isVisibleAddGenreModal &&
                    <AddGenreModal />
                } 
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        genres: state.administration.genres,
        genresCount: state.administration.genresCount,
        isVisibleAddGenreModal: state.modals.showAddGenreModal
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getAllGenres: () => dispatch(genresActions.getAllGenres()),
        openAddGenreModal: () => dispatch(modalsActions.openAddGenreModal())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllGenresList);