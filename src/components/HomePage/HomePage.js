import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Link to='/words/card'>words</Link>
                <Link to='/phrases/card'>phrases</Link>
            </div>
        )
    }
}