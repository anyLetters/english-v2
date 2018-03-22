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
        this.setState({page: page - 1}, () => {
            this.pagination();
            this.props.onChangePage(page - 1);
        });
    }

    handleRowsChange(newRowsNumber) {
        let {page, rows} = this.state;
        let newPage = Math.floor((page * rows) / newRowsNumber);

        this.setState({
            rows: newRowsNumber,
            page: newPage
        }, () => {
            this.pagination();
            this.props.onChangeRows(newRowsNumber);
            this.props.onChangePage(newPage);
        });
    }

    pagination(nextProps) {
        let { page, rows } = this.state;
        let offset = page * rows;

        if (nextProps) {
            const words = nextProps.words.slice(0, rows);
            this.setState({words, page, totalPages: Math.ceil(nextProps.words.length / rows)});
        } else if (page > this.state.totalPages) {
            const words = this.props.words.slice(0, rows);
            this.setState({words, page: 0, totalPages: Math.ceil(this.props.words.length / rows)});
        } else {
            const words = this.props.words.slice(offset, offset + rows);
            this.setState({words, page, totalPages: Math.ceil(this.props.words.length / rows)});
        }
    }

    componentDidMount() {
        this.pagination();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.words.length !== this.props.words.length) {
            this.setState({page: 0}, () => {
                this.props.onChangePage(0);
                this.pagination(nextProps);
            });
        } else {
            let { page, rows } = this.state;
            let offset = page * rows;
            const words = nextProps.words.slice(offset, offset + rows);
            this.setState({words});
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
                        onToggleHard={this.props.onToggleHard}/>
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
    onToggleHard: PropTypes.func.isRequired
};