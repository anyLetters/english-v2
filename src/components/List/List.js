import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../UI/Loading/Loading.js';
import Table from '../UI/List/List.js';
import NotFound from '../NotFound/NotFound.js';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            offset: 0,
            selected: 1,
            rows: 15,
            pageCount: Math.ceil(props.data.length / 15)
        };

        this.handlePageClick = this.handlePageClick.bind(this);
        this.paginateData = this.paginateData.bind(this);
        this.handleRowsChange = this.handleRowsChange.bind(this);
    }

    handlePageClick(data) {
        let selected = data.selected;
        let offset = Math.ceil((selected - 1) * this.state.rows);
        this.setState({offset, selected}, () => this.paginateData());
    }

    handleRowsChange(rows) {
        this.setState({rows}, () => this.paginateData());
    }

    paginateData(nextProps) {
        if (nextProps) {
            const data = nextProps.data.slice(0, this.state.rows);
            this.setState({data, offset: 0, pageCount: Math.ceil(nextProps.data.length / this.state.rows)});
        } else {
            const data = this.props.data.slice(this.state.offset, this.state.offset + this.state.rows);
            this.setState({data, pageCount: Math.ceil(this.props.data.length / this.state.rows)});
        }
    }

    componentDidMount() {
        this.paginateData();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({selected: 1}, () => this.paginateData(nextProps));
    }

    render() {
        if (!this.props.fetching) {
            if (!this.state.data.length) return <NotFound/>

            return (
                <div className='list-container'>
                    <Table 
                        data={this.state.data}
                        selected={this.state.selected}
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