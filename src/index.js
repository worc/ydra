import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import Stargazer, { gazers, stargazerSaga } from './stargazer'
import NotFound from './404.js'

const sagas = createSagaMiddleware()

const rootReducer = combineReducers({
    gazers,
})
const store = createStore(
    rootReducer,
    applyMiddleware(sagas)
)

const rootSaga = function* () {
    yield all([
        stargazerSaga()
    ])
}

sagas.run(rootSaga)

render(
    <Provider store={ store }>
        <BrowserRouter>
            <Switch>
                <Route path='/stargazer' component={ Stargazer } />
                <Route path='*' component={ NotFound } />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('app')
)
