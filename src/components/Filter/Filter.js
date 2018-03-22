import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Switchbox from '../UI/Switchbox/Switchbox.js';
import CharactersFilterField from '../UI/CharactersFilterField/CharactersFilterField.js';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: props.filter.characters
        };

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    handleCheckboxChange() {
        this.props.onToggleHardFilter();
    }

    handleChangeInput(value) {
        let characters = value.replace(/[^A-Za-z\s!?]/g,'').split('');
        characters = Array.from(new Set(characters)).toString();

        if (this.state.characters !== characters.split(',').join(', ')) {
            this.props.onChangeCharactersFilter(Array.from(characters.split(',')));
        }

        this.setState({characters: characters.split(',').join(', ')});
    }

    render() {
        return (
            <div className='filter menu__element'>
                <CharactersFilterField
                    value={this.state.characters}
                    onChange={this.handleChangeInput} />
                <Switchbox
                    checked={this.props.filter.hard}
                    onChange={this.handleCheckboxChange} />
            </div>
        );
    }
}

Filter.propTypes = {
    filter: PropTypes.object.isRequired,
    onChangeCharactersFilter: PropTypes.func.isRequired,
    onToggleHardFilter: PropTypes.func.isRequired
};