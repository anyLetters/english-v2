import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js';
import ToggleInputs from '../ToggleInputs/ToggleInputs.js';
import FilterContainer from '../../containers/FilterContainer.js';
import ToggleMode from '../ToggleMode/ToggleMode.js';

export default function Menu(props) {
    // console.log(props);
    return (
        <div style={{border: '2px solid black'}}>
            <Link to='/'>HOME</Link>
            <Navigation match={props.match} />
            <ToggleInputs history={props.history} />
            <FilterContainer />
            <ToggleMode onToggleMode={props.onToggleMode} mode={props.mode} />
        </div>
    )
}