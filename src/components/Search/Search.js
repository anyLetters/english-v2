import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchField from '../UI/SearchField/SearchField.js';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: props.keyword
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(keyword) {
        this.setState({keyword});
        this.props.onChangeKeywordFilter({keyword});
    }

    render() {
        return (
            <div className='search menu__element'>
                <SearchField keyword={this.state.keyword} onChange={this.handleChange}  />
            </div>
        )
    }
}

Search.propTypes = {
    keyword: PropTypes.string,
    onChangeKeywordFilter: PropTypes.func.isRequired
};