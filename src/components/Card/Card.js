import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: props.data[
                props.mode === 'RANDOM' ? Math.floor(Math.random() * (props.data.length - 0) ) + 0 : 0
            ],
            mode: props.mode,
            offset: 0
        };
        
        this.getNextWord = this.getNextWord.bind(this);
    }

    getNextWord() {
        if (this.state.mode === 'RANDOM') {
            this.setState({
                offset: 0
            });
            this.setState({
                word: this.props.data[Math.floor(Math.random() * (this.props.data.length - 0) ) + 0]
            });
        } else {
            this.setState({ 
                offset: this.state.offset >= this.props.data.length - 1 ? 0 : this.state.offset + 1 
            });
            this.setState({
                word: this.props.data[this.state.offset]
            });
        }
    }

    componentWillReceiveProps(props) {
        if (this.state.mode !== props.mode) {
            this.setState({ mode: props.mode });
        }
        if (props.data.length === 1) {
            this.setState({ word: props.data[0] });
        }
        if (this.state.mode === props.mode) {
            this.setState({ word: props.data[0] });
        }
    }

    render() {
        if (!this.props.fetching && this.state.word) {
            return (
                <div>
                    {typeof this.state.word !== 'undefined' ? this.state.word.eng : 'NOT FOUND'}
                    <button onClick={this.getNextWord}>Next</button>
                    <Link to={`/words/${this.state.word.id}/show`}>More meanings</Link>
    
                </div>
            )
        } else {
            return <div>Loading...</div>
        }
    }
}