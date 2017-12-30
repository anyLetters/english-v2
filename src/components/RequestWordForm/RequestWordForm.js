import React, { Component } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import store from '../../store';

export default class RequestWordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let errors = [];
        let word = this.refs.add.value.toLowerCase().trim();
        let isAlreadyHas = false;
        let containsOtherSymbols = !/^[a-zA-Z\s]+$/.test(word);

        store.getState().words.forEach(element => {
            if (element.eng.toLowerCase().trim() === word) {
                isAlreadyHas = true;
            }
        });
        
        if (!isAlreadyHas && !containsOtherSymbols) {
            this.props.history.push(`/words/add/${word}`);
            this.props.onSubmit();
        } else {
            if (isAlreadyHas) errors.push('already has');
            if (containsOtherSymbols) errors.push('only letters');
            this.setState({errors});
        }
    }

    renderErrors() {
        return (
            <div>
                {this.state.errors.map((error, index) => <div key={index}>{error}</div>)}
            </div>
        )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref='add' placeholder='add'/>
                </form>
                {this.state.errors ? this.renderErrors() : ''}
            </div>
        )
    }
}