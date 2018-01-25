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
            data: [],
            currentPage: 0,
            rows: 15,
            pageCount: Math.ceil(props.data.length / 15)
        };

        this.handlePageClick = this.handlePageClick.bind(this);
        this.paginateData = this.paginateData.bind(this);
        this.handleRowsChange = this.handleRowsChange.bind(this);
    }

    handlePageClick(currentPage) {
        this.setState({currentPage: currentPage - 1}, () => this.paginateData());
    }

    handleRowsChange(value) {
        let newRows = value;
        let {currentPage, rows} = this.state;
        let newPage = Math.floor((currentPage * rows) / newRows);
    
        this.setState({
            rows: newRows,
            currentPage: newPage,
        }, () => this.paginateData());
    }

    paginateData(nextProps) {
        let { currentPage, rows } = this.state;
        let offset = currentPage * rows;

        if (nextProps) {
            const data = nextProps.data.slice(0, rows);
            this.setState({data, currentPage, pageCount: Math.ceil(nextProps.data.length / rows)});
        } else {
            const data = this.props.data.slice(offset, offset + rows);
            this.setState({data, currentPage, pageCount: Math.ceil(this.props.data.length / rows)});
        }
    }

    componentDidMount() {
        this.paginateData();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({currentPage: 0}, () => this.paginateData(nextProps));
    }

    render() {
        if (!this.props.fetching) {
            if (_.isEmpty(this.state.data) || this.state.currentPage > this.state.pageCount) return <NotFound/>;
            return (
                <div className='list-container'>
                    <Table
                        data={this.state.data}
                        currentPage={this.state.currentPage}
                        pageCount={this.state.pageCount}
                        onPageChange={this.handlePageClick}
                        onRowsChange={this.handleRowsChange}
                        rows={this.state.rows}/>
                </div>
            )
        } else {
            return <Loading />;
        }
    }
}

List.propTypes = {
    data: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired
};