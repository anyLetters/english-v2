import React from 'react';
import StatsUI from '../UI/Stats/Stats.js';
import PropTypes from 'prop-types';

export default function Stats(props) {
    return (
        <div className='stats menu__element'>
            <StatsUI total={props.total} totalHardWords={props.totalHardWords} />
        </div>
    );
}

Stats.propTypes = {
    total: PropTypes.number.isRequired,
    totalHardWords: PropTypes.number.isRequired
};
