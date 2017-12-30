import React, { Component } from 'react';

export default class ToggleMode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: props.mode
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({ mode: e.target.value }, () => this.props.onToggleMode(value));
    }

    render() {
        return (
            <div>
                <span>mode:</span>
                <input 
                    type="radio" 
                    value='RANDOM' 
                    checked={this.state.mode === 'RANDOM'}
                    onChange={this.handleChange} 
                    name='mode'/>
                <input 
                    type="radio" 
                    value='SERIAL' 
                    checked={this.state.mode === 'SERIAL'} 
                    onChange={this.handleChange}
                    name='mode'/>
            </div>
        )
    }
}