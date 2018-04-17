import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../Navigation/Navigation.js';
import PrimaryForm from '../PrimaryForm/PrimaryForm.js';
import Filter from '../../containers/FilterContainer.js';
import Mode from '../Mode/Mode.js';
import Stats from '../Stats/Stats.js';
import Search from '../../containers/SearchContainer.js';

export default function Menu({match, onToggleMode, mode, totalHardWords, total}) {
    return (
        <header className='header'>
            <div className='menu header__menu'>
                <Navigation match={match} />
                <PrimaryForm/>
                <Mode onToggleMode={onToggleMode} mode={mode} />
                <Filter/>
                <Search/>
                <Stats total={total} totalHardWords={totalHardWords} />
            </div>
        </header>
    );
}

Menu.propTypes = {
    filter: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
    count: PropTypes.number,
    total: PropTypes.number,
    totalHardWords: PropTypes.number,
    match: PropTypes.object,
    history: PropTypes.object,
    onChangeKeywordFilter: PropTypes.func.isRequired,
    onToggleMode: PropTypes.func.isRequired
};