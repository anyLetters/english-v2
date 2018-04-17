import React from 'react';
import StatsUI from '../UI/Stats/Stats.js';
import PropTypes from 'prop-types';

export default function Stats({ total, totalHardWords }) {
    return (
        <div className='stats menu__element'>
            <StatsUI total={total} totalHardWords={totalHardWords} />
        </div>
    );
}

Stats.propTypes = {
    total: PropTypes.number.isRequired,
    totalHardWords: PropTypes.number.isRequired
};