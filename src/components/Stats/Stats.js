import React, { Component } from 'react';
import StatsUI from '../UI/Stats/Stats.js';

export default class Stats extends Component {
    render() {
        return (
            <div className='stats menu__element'>
                <StatsUI total={this.props.count}/>
            </div>
        )
    }
}