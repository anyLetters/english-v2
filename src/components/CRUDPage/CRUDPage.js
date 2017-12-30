import React, { Component } from 'react';
import ApiWords from '../../api/words.js';

export default class CRUDPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            action: props.match.params.id ? 'show' : 'add',
            error: ''
        };
    }

    componentDidMount() {
        if (!this.props.fetching) {
            switch(this.state.action) {
                case 'add':
                    ApiWords.fetchWord(this.props.match.params.word).then(res => {
                        this.setState({word: res, error: ''});
                    }).catch(err => {
                        this.setState({word: '', error: err.message});
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
                this.setState({word, error: ''});
            }).catch(err => {
                this.setState({error: err.message});
            });;
        }
    }

    render() {
        if (this.state.word && !this.state.error) {
            console.log(this.state.word);
            return <div>{this.state.word.eng} {this.state.word.rus}</div>;
        } else {
            return <div>{this.state.error}</div>;
        }
        return <div>Loading...</div>
    }
}