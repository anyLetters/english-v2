import React from 'react';
import StatsUI from '../UI/Stats/Stats.js';

export default function Stats(props) {
    return (
        <div className='stats menu__element'>
            <StatsUI total={props.total} totalHardWords={props.totalHardWords} />
        </div>
    );
}