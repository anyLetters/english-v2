import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../UI/Loading/Loading.js';
import CardUI from '../UI/Card/Card.js';
import NotFound from '../NotFound/NotFound.js';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: props.data[Math.floor(Math.random() * (props.data.length - 0) ) + 0],
            mode: props.mode,
            offset: 0
        };
        
        this.getNextWord = this.getNextWord.bind(this);
    }

    getNextWord() {
        if (this.state.mode === 'RANDOM') {
            this.setState({offset: 0});
            this.setState({
                word: this.props.data[Math.floor(Math.random() * (this.props.data.length - 0) ) + 0]
            });
        } else if (this.state.mode === 'SERIAL') {
            let offset = this.state.offset;
            this.setState({ 
                offset: offset >= this.props.data.length - 1 ? 0 : offset + 1
            }, () => {
                this.setState({
                    word: this.props.data[offset]
                });
            });
        }
    }

    componentWillReceiveProps(props) {
        if (this.state.mode !== props.mode) {
            this.setState({ mode: props.mode });
        }
        if (this.state.mode === props.mode) {
            this.setState({ word: props.data[Math.floor(Math.random() * (props.data.length - 0) ) + 0] });
            if (this.state.mode === 'SERIAL') this.setState({offset: 0});
        }
        if (!props.data.length) {
            this.setState({ word: 'NOT FOUND' });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.data.length !== 0 && this.state.word) {
            const index = nextProps.data.findIndex(word => word.id === this.state.word.id);
            if (index >= 0) {
                if (nextProps.data[index].hard !== this.state.word.hard) {
                    nextState.word = nextProps.data[index];
                }
            }
        }
    }

    render() {
        if (!this.props.fetching) {
            if (this.state.word !== 'NOT FOUND' && typeof this.state.word !== 'undefined') {
                return (
                    <div className='card-container'>
                        <CardUI 
                            word={this.state.word} 
                            next={this.getNextWord}
                            sayThis={this.handleSay}
                            amount={this.props.data.length}
                            toggleHard={this.props.onToggleHard}/>
                    </div>
                )
            } else {
                return <NotFound/>
            }
        } else {
            return <Loading />;
        }
    }
}

Card.propTypes = {
    data: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
    fetching: PropTypes.bool.isRequired,
    onToggleHard: PropTypes.func.isRequired
};

