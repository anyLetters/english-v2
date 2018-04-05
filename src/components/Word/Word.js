import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditForm from '../../containers/FormContainer.js';
import Loading from '../UI/Loading/Loading.js';
import NotFound from '../NotFound/NotFound.js';
import _Word from '../UI/Word/Word.js';

export default class Word extends Component {
    constructor(props) {
        super(props);

        this.state = {
            word: null,
            edit: false,
            fetchingWords: props.fetching
        };

        this.renderShowcase = this.renderShowcase.bind(this);
        this.history = this.props.history;
        this.showEditForm = this.showEditForm.bind(this);
        this.handleDeleteWord = this.handleDeleteWord.bind(this);
        this.updateThisState = this.updateThisState.bind(this);
    }

    componentDidMount() {
        if (!this.state.fetchingWords) {
            this.setState({word: this.props.words[this.props.match.params.id - 1]});
        }
    }

    showEditForm() {
        const edit = this.state.edit;
        this.setState({edit: !edit});
    }

    handleDeleteWord() {
        this.props.onDeleteWord(this.state.word.id);
        this.history.goBack();
    }

    updateThisState(word) {
        this.setState({word});
    }

    renderShowcase() {
        return (
            <div className='showcase'>
                <_Word
                    word={this.state.word}
                    onEdit={this.showEditForm}
                    onDelete={this.handleDeleteWord}/>
                <EditForm
                    word={this.state.word}
                    open={this.state.edit}
                    onClose={this.showEditForm}
                    action='edit'
                    updateParentState={this.updateThisState}/>
            </div>
        );
    }

    render() {
        if (this.state.word && !this.state.fetchingWords) {
            return this.renderShowcase();
        } else if (!this.state.word) {
            return <NotFound/>;
        }
        return <Loading />;
    }
}

Word.propTypes = {
    words: PropTypes.array,
    history: PropTypes.object,
    match: PropTypes.object,
    fetching: PropTypes.bool.isRequired,
    onDeleteWord: PropTypes.func.isRequired
};