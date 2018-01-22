import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditForm from '../../containers/FormContainer.js';
import Loading from '../UI/Loading/Loading.js';
import NotFound from '../NotFound/NotFound.js';
import Show from '../UI/Show/Show.js';

export default class ShowPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            word: null,
            edit: false,
            fetchingData: props.fetching
        };

        this.renderViewer = this.renderViewer.bind(this);
        this.history = this.props.history;
        this.onEditWord = this.props.onEditWord;
        this.showUpEditForm = this.showUpEditForm.bind(this);
        this.handleDeleteWord = this.handleDeleteWord.bind(this);
        this.updateThisState = this.updateThisState.bind(this);
    }

    componentDidMount() {
        if (!this.state.fetchingData) {
            this.setState({word: this.props.data[this.props.match.params.id - 1]});
        }
    }

    showUpEditForm() {
        const edit = this.state.edit;
        this.setState({edit: !edit});
    }

    handleDeleteWord() {
        this.props.onDeleteWord(this.state.word.id);
        this.history.push('/words/card');
    }

    updateThisState(word) {
        this.setState({word});
    }

    renderViewer() {
        return (
            <div style={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent:'center', 
                flexDirection: 'column',
                height: 'calc(100% - 158px)'
            }}>
                <Show
                    word={this.state.word}
                    onEdit={this.showUpEditForm}
                    onDelete={this.handleDeleteWord}/>
                <EditForm
                    word={this.state.word}
                    open={this.state.edit}
                    onClose={this.showUpEditForm}
                    action='edit'
                    updateParentState={this.updateThisState}/>
            </div>
        )
    }

    render() {
        if (this.state.word && !this.state.fetchingData) {
            return this.renderViewer();
        } else if (!this.state.word) {
            return <NotFound/>
        }
        return <Loading />;
    }
}

ShowPage.propTypes = {
    data: PropTypes.array,
    fetching: PropTypes.bool.isRequired,
    onDeleteWord: PropTypes.func.isRequired
};