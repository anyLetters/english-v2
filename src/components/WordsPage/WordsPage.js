import React from 'react';
import MenuContainer from '../../containers/MenuContainer.js';
import ListContainer from '../../containers/ListContainer.js';
import CardContainer from '../../containers/CardContainer.js';
import CRUDContainer from '../../containers/CRUDContainer.js';
import { Route, Switch, Redirect } from 'react-router-dom';

export default function WordsPage({match}) {
    return (
        <div>
            <Route path={`${match.url}/*`} component={MenuContainer} />
            <Switch>
                <Route path={`${match.url}/card`} component={CardContainer} />
                <Route path={`${match.url}/list`} component={ListContainer} />
                <Route path={`${match.url}/add/:word`} component={CRUDContainer} />
                <Route path={`${match.url}/:id/show`} component={CRUDContainer} />
            </Switch>
        </div>
    )
}