import React, { Component } from 'react';
import ApiWords from '../../api/words.js';

export default class CRUDPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: null,
            action: props.match.params.id ? 'show' : 'add'
        };
    }

    componentDidMount() {
        if (!this.props.fetching) {
            switch(this.state.action) {
                case 'add':
                    ApiWords.fetchWord(this.props.match.params.word).then(word => {
                        if (word) this.setState({word});
                    });
                    break;
    
                case 'show':
                    this.setState({word: this.props.data[this.props.match.params.id - 1]});
                    break;
    
                default:
                    break;
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.word.eng !== nextProps.match.params.word && this.state.action === 'add') {
            ApiWords.fetchWord(nextProps.match.params.word).then(word => {
                if (word) this.setState({word});
            });
        }
    }

    render() {
        if (this.state.word) {
            return <div>{this.state.word.eng} {this.state.word.rus}</div>;
        }
        return <div>Loading...</div>
    }
}