import React, { Component } from 'react';
import RequestWordForm from '../RequestWordForm/RequestWordForm.js';
import SearchContainer from '../../containers/SearchContainer.js';

export default class ToggleInputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeInput: 'search'
        };
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleClick(input) {
        this.setState({ activeInput: input });
    }

    onSubmit() {
        this.setState({activeInput: 'search'})
    }

    render() {

        return (
            <div style={{border: '2px solid darkblue'}}>
                <button type='button' onClick={() => this.handleClick('search')}>Search</button>
                <button type='button'onClick={() => this.handleClick('requestForm')}>ADD</button>

                {this.state.activeInput === 'search' ? 
                <SearchContainer/> 
                : 
                <RequestWordForm onSubmit={this.onSubmit} {...this.props} />}
            </div>
        )
    }
}