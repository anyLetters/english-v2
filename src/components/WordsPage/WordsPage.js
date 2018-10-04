import React from 'react';
import PropTypes from 'prop-types';
import MenuContainer from '../../containers/MenuContainer.js';
import ListContainer from '../../containers/ListContainer.js';
import CardContainer from '../../containers/CardContainer.js';
import WordContainer from '../../containers/WordContainer.js';
import {Route, Switch} from 'react-router-dom';

export default function WordsPage({match}) {
    return (
        <div className='content'>
            <Route path={`${match.url}/*`} component={MenuContainer} />
            <Switch>
                <Route path={`${match.url}/card`} component={CardContainer} />
                <Route path={`${match.url}/list`} component={ListContainer} />
                <Route path={`${match.url}/:id`} component={WordContainer} />
            </Switch>
        </div>
    );
}

WordsPage.propTypes = {
    match: PropTypes.object.isRequired
};