import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radio from '../UI/Radio/Radio.js';

export default class Mode extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: props.mode
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(mode) {
        this.setState({ mode }, () => this.props.onToggleMode(mode));
    }

    render() {
        return (
            <div className='mode-block'>
                <Radio mode={this.state.mode} onChange={this.handleChange} />
            </div>
        );
    }
}

Mode.propTypes = {
    mode: PropTypes.string.isRequired,
    onToggleMode: PropTypes.func.isRequired
};