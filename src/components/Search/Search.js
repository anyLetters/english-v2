import React, { Component } from 'react';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: props.keyword
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onChangeKeywordFilter({keyword: this.refs.search.value});
        this.setState({keyword: this.refs.search.value});
    }

    render() {
        return (
            <input 
                type="text" 
                ref='search' 
                onChange={this.handleChange} 
                defaultValue={this.state.keyword}
                placeholder='search'/>
        )
    }
}