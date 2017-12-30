import React, { Component } from 'react';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: props.filter.characters
        };

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    onCheckboxChange() {
        this.props.onToggleHardFilter();
    }

    onChangeInput() {
        let characters = this.refs.characters.value.replace(/[^A-Za-z\s!?]/g,'').split('');
        characters = Array.from(new Set(characters)).toString();

        if (this.state.characters !== characters) {
            this.props.onChangeCharactersFilter(Array.from(characters.split(',')));
        }

        this.setState({characters});
    }

    render() {
        return (
            <div style={{border: '2px solid red'}}>
                <span>Only Hard</span>
                <input 
                    type="checkbox" 
                    checked={this.props.filter.hard} 
                    onChange={this.onCheckboxChange}/>
                <span>Characters: </span>
                <input type="text" ref='characters' value={this.state.characters} onChange={this.onChangeInput} />
            </div>
        );
    }
}