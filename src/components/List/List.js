import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../UI/Loading/Loading.js';
import Table from '../UI/List/List.js';
import NotFound from '../NotFound/NotFound.js';
import _ from 'lodash';

export default class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            words: [],
            page: props.page,
            rows: props.rows,
            totalPages: Math.ceil(props.words.length / props.rows)
        };

        this.handlePageClick = this.handlePageClick.bind(this);
        this.pagination = this.pagination.bind(this);
        this.handleRowsChange = this.handleRowsChange.bind(this);
    }

    handlePageClick(page) {
        this.props.onChangePage(page - 1);
        this.pagination(null, page - 1);
    }

    handleRowsChange(newRowsNumber) {
        let { page, rows } = this.state;
        let newPage = Math.floor((page * rows) / newRowsNumber);

        this.setState({ rows: newRowsNumber, page: newPage }, () => {
            this.pagination(null, newPage);
            this.props.onChangeRows(newRowsNumber);
            this.props.onChangePage(newPage);
        });
    }

    pagination(nextProps, page) {
        let { rows } = this.state;
        let offset = page * rows;

        if (!_.isEmpty(this.props.words) || nextProps) {
            if (nextProps) {
                const words = nextProps.words.slice(0, rows);
                this.setState({words, page, totalPages: Math.ceil(nextProps.words.length / rows)});
            } else {
                const words = this.props.words.slice(offset, offset + rows);
                this.setState({words, page, totalPages: Math.ceil(this.props.words.length / rows)});
            }
        }
    }

    componentWillMount() {
        let { page, rows, totalPages } = this.state;
        if (page > totalPages) {
            const words = this.props.words.slice(0, rows);
            this.setState({words, page: 0, totalPages: Math.ceil(this.props.words.length / rows)});
        } else {
            this.pagination(null, page);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.words.length !== this.props.words.length) {
            this.props.onChangePage(0);
            this.pagination(nextProps, 0);
        } else {
            let { rows } = this.state;
            let offset = nextProps.page * rows;
            const words = nextProps.words.slice(offset, offset + rows);
            this.setState({words, page: nextProps.page});
        }
    }

    render() {
        if (!this.props.fetching) {
            if (_.isEmpty(this.state.words) || this.state.page > this.state.totalPages) return <NotFound/>;
            return (
                <div className='list-container'>
                    <Table
                        words={this.state.words}
                        page={this.state.page}
                        totalPages={this.state.totalPages}
                        onPageChange={this.handlePageClick}
                        onRowsChange={this.handleRowsChange}
                        rows={this.state.rows}
                        onToggleHard={this.props.onToggleHard}
                        onChangeSortKey={this.props.onChangeSortKey}
                        onToggleAlphabeticalOrder={this.props.onToggleAlphabeticalOrder}
                        sortKey={this.props.sortKey}
                        sortByABC={this.props.sortByABC}/>
                </div>
            );
        } else {
            return <Loading />;
        }
    }
}

List.propTypes = {
    words: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    fetching: PropTypes.bool.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangeRows: PropTypes.func.isRequired,
    onToggleHard: PropTypes.func.isRequired,
    onChangeSortKey: PropTypes.func.isRequired,
    onToggleAlphabeticalOrder: PropTypes.func.isRequired,
    sortKey: PropTypes.string,
    sortByABC: PropTypes.bool
};