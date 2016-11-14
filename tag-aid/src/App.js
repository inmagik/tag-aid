import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';
import Home from './containers/Home';
import TagAid from './components/TagAid';

// const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, undefined, compose(
  applyMiddleware(routerMiddleware(browserHistory)),//, sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

const history = syncHistoryWithStore(browserHistory, store);

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path={'/'} component={Home} />
      <Route path={'/tag-aid'} component={TagAid} />
    </Router>
  </Provider>
);

export default App;