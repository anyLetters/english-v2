import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation({match}) {
    // console.log(match);
    return (
        <div>
            <NavLink to={`/words/card`}>CARD </NavLink>
            <NavLink to={`/words/list`}>LIST</NavLink>
        </div>
    )
}