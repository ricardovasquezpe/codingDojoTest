import React from 'react'
import LoginPage from './core/login'
import MoviesPage from './core/movies'
import CreateMoviePage from './core/movies/create'
import ReviewsPage from './core/reviews'
import { Router, Switch, Route } from 'react-router-dom';
import { Component } from 'react';
import history from './utils/history';

class App extends Component {
  
  render() {
      return (
        <Router history={history}>
        <div>
          <h2>Moldy Tomatoes</h2>
          <hr />
          <Switch>
              <Route exact path='/' component={LoginPage} />
              <Route path='/movies' component={MoviesPage} />
              <Route path='/reviews' component={ReviewsPage} />
              <Route path='/createmovie' component={CreateMoviePage} />
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App