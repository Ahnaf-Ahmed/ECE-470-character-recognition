import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ROUTES } from '../common/constants';
import Home from './Home'
import Identify from './Identify'
import Stats from './Stats'

import './App.scss';

const App = () => {
    let location = useLocation();

    return (
        <div className="app">
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="page"
                    timeout={300}
                >
                    <Switch location={location}>
                        <Route exact path={ROUTES.HOME_ROUTE}>
                            <Home />
                        </Route>
                        <Route path={ROUTES.IDENTIFY_ROUTE}>
                            <Identify />
                        </Route>
                        <Route path={ROUTES.STATS_ROUTE}>
                            <Stats />
                        </Route>
                        <Redirect to={ROUTES.HOME_ROUTE} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default App;
