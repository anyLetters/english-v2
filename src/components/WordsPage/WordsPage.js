import React from 'react';
import MenuContainer from '../../containers/MenuContainer.js';
import ListContainer from '../../containers/ListContainer.js';
import CardContainer from '../../containers/CardContainer.js';
import WordContainer from '../../containers/WordContainer.js';
import {Route, Switch} from 'react-router-dom';

export default function WordsPage({match}) {
    return (
        <div className='content' style={{height: '100%', width: '100%'}}>
            <Route path={`${match.url}/*`} component={MenuContainer} />
            <Switch>
                <Route path={`${match.url}/card`} component={CardContainer} />
                <Route path={`${match.url}/list`} component={ListContainer} />
                <Route path={`${match.url}/:id/word`} component={WordContainer} />
            </Switch>
        </div>
    );
}