import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../UI/Loading/Loading.js';
import _Card from '../UI/Card/Card.js';
import NotFound from '../NotFound/NotFound.js';
import _ from 'lodash';

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            word: _.sample(props.words),
            mode: props.mode,
            offset: 0
        };

        this.getNextWord = this.getNextWord.bind(this);
    }

    getNextWord() {
        if (this.state.mode === 'RANDOM') {
            this.setState({offset: 0});
            this.setState({word: _.sample(this.props.words)});
        } else if (this.state.mode === 'SERIAL') {
            let offset = this.state.offset;
            this.setState({offset: offset >= this.props.words.length - 1 ? 0 : offset + 1}, () => {
                this.setState({word: this.props.words[offset]});
            });
        }
    }

    componentWillReceiveProps(props) {
        if (props.words.length) {
            if (this.state.mode !== props.mode) {
                this.setState({ mode: props.mode });
            }
            if (this.state.mode === props.mode) {
                this.setState({ word: _.sample(props.words)});
                if (this.state.mode === 'SERIAL') this.setState({offset: 0});
            }
        } else {
            this.setState({ word: null });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (!_.isLength(nextProps.words) && this.state.word) {
            const index = _.findIndex(nextProps.words, ['id', this.state.word.id]);
            if (index >= 0) {
                if (nextProps.words[index].hard !== this.state.word.hard) {
                    nextState.word = nextProps.words[index];
                }
            }
        }
    }

    render() {
        if (!this.props.fetching) {
            if (!_.isEmpty(this.state.word)) {
                return (
                    <div className='card-container'>
                        <_Card
                            word={this.state.word}
                            next={this.getNextWord}
                            sayThis={this.handleSay}
                            toggleHard={this.props.onToggleHard}/>
                    </div>
                );
            } else {
                return <NotFound/>;
            }
        } else {
            return <Loading />;
        }
    }
}

Card.propTypes = {
    words: PropTypes.array.isRequired,
    mode: PropTypes.string.isRequired,
    fetching: PropTypes.bool.isRequired,
    onToggleHard: PropTypes.func.isRequired
};