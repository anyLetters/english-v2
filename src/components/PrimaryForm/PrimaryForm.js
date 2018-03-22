import React, { Component } from 'react';
import store from '../../store';
import ApiWords from '../../api/words';
import PrimaryFormUI from '../UI/PrimaryForm/PrimaryForm.js';
import FormDialog from '../../containers/FormContainer.js';

export default class PrimaryForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isFormDialogActive: false,
            word: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderPrimaryForm = this.renderPrimaryForm.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.cleanAnErrors = this.cleanAnErrors.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    handleSubmit(word) {
        if (this.isValid(word)) {
            ApiWords.fetchWord(word).then(word => {
                this.setState({isFormDialogActive: true, word});
            }).catch(err => {
                this.setState({error: err.message});
            });
        }
    }

    isValid(word) {
        this.cleanAnErrors();
        let valid = true;

        if (!/^[a-zA-Z\s]+$/.test(word)) {
            this.setState({error: 'Only Latin characters'});
            valid = false;
        }

        store.getState().words.forEach(w => {
            if (w.eng.toLowerCase().trim() === word.toLowerCase()) {
                this.setState({error: 'Already added'});
                valid = false;
            }
        });

        return valid;
    }

    cleanAnErrors() {
        this.setState({error: null});
    }

    handleClose() {
        this.setState({isFormDialogActive: false, word: null });
    }

    renderPrimaryForm() {
        return <PrimaryFormUI
                    onSubmit={this.handleSubmit}
                    cleanErrors={this.cleanAnErrors}
                    error={this.state.error}/>;
    }

    render() {
        if (!this.state.isFormDialogActive) {
            return (
                <div className='primary-form'>
                    {this.renderPrimaryForm()}
                </div>
            );
        } else {
            return (
                <div className='primary-form'>
                    {this.renderPrimaryForm()}
                    <FormDialog
                        word={this.state.word}
                        open={this.state.isFormDialogActive}
                        onClose={this.handleClose}
                        onSubmit={this.handleSubmit}
                        action='add' />
                </div>
            );
        }
    }
}