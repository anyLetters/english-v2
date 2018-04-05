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
        this.handleToggleHard = this.handleToggleHard.bind(this);
    }

    getNextWord(nextProps) {
        const { mode, offset } = this.state;
        const propWords = nextProps.words ? nextProps.words : this.props.words;

        switch (mode) {
            case 'RANDOM':
                this.setState({offset: 0, word: _.sample(propWords)});
                break;
            case 'SERIAL':
                this.setState({offset: offset >= propWords.length - 1 ? 0 : offset + 1, word: propWords[offset]});
                break;
            default:
                return mode;
        }
    }

    handleToggleHard() {
        this.props.onToggleHard(this.state.word.id);
    }

    isWordHardPropertyHasToggled(nextProps) {
        const { word } = this.state;
        const { words } = this.props;

        if (words.length === nextProps.words.length && !_.isEmpty(word)) {
            const index = _.findIndex(nextProps.words, ['id', word.id]);
            if (index >= 0 && nextProps.words[index].hard !== word.hard) {
                this.setState({ word: nextProps.words[index] });
                return true;
            }
        }
        return false;
    }

    componentWillReceiveProps(nextProps) {
        const { mode } = this.state;
        if (mode !== nextProps.mode) {
            this.setState({ mode: nextProps.mode });
        } else {
            if (_.isEmpty(nextProps.words)) {
                this.setState({ word: null });
                return;
            }
            if (this.isWordHardPropertyHasToggled(nextProps)) return;
            this.getNextWord(nextProps);
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
                            toggleHard={this.handleToggleHard}/>
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