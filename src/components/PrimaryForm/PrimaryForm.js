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
        this.handleCleanErrors = this.handleCleanErrors.bind(this);
    }

    handleSubmit(res) {
        let error;
        this.handleCleanErrors();
        
        let word = res;
        let isAlreadyAdded = false;
        let containsOtherSymbols = !/^[a-zA-Z\s]+$/.test(word);

        store.getState().words.forEach(element => {
            if (element.eng.toLowerCase().trim() === word.toLowerCase()) {
                isAlreadyAdded = true;
            }
        });

        if (!containsOtherSymbols && !isAlreadyAdded) {
            ApiWords.fetchWord(word).then(word => {
                this.setState({isFormDialogActive: true, word});
            }).catch(err => {
                error = err.message;
                this.setState({error});
            });
        } else {
            if (isAlreadyAdded) error = 'Already added';
            if (containsOtherSymbols) error = 'Only Latin characters';
            this.setState({error});
        }
    }

    handleCleanErrors() {
        this.setState({error: null});
    }

    handleClose() {
        this.setState({isFormDialogActive: false, word: null })
    }

    renderPrimaryForm() {
        return <PrimaryFormUI 
                    onSubmit={this.handleSubmit} 
                    cleanErrors={this.handleCleanErrors}
                    error={this.state.error}/>;
    }

    render() {
        if (!this.state.isFormDialogActive) {
            return (
                <div className='primary-form'>
                    {this.renderPrimaryForm()}
                </div>
            )
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
            )
        }
    }
}