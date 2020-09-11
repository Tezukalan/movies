import React, { lazy } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import movisListReducer from './reducers';

const store = createStore(movisListReducer);

function App() {
  const NotFoundPage = lazy(() => import('./pages/NotFound/NotFoundPage'));
  const MoviesListPage = lazy(() => import('./pages/MoviesList/MoviesListPage'));
  const MoviePage = lazy(() => import('./pages/Movie/MoviePage'));

  return (
    <div className="content">
      <Provider store={store}>
        <React.Suspense fallback={<CircularProgress />}>
          <Router>
            <Switch>
              <Route path="/movies" component={MoviesListPage} />
              <Route exact path="/movie/:id" component={MoviePage} />
              <Route path="/not-found" component={NotFoundPage} />

              <Route exact path="/" render={() => <Redirect to="/movies" />} />
              <Route render={() => <Redirect to="/not-found" />} />
            </Switch>
          </Router>
        </React.Suspense>
      </Provider>
    </div>
  );
}

export default App;
