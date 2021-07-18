import React from 'react'
import LoginPage from './core/login'
import { MoviesPage } from './core/movies'
import { ReviewsPage } from './core/reviews'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Component } from 'react';

class App extends Component {
  render() {
      return (
        <Router>
        <div>
          <h2>Moldy Tomatoes</h2>
          <hr />
          <Switch>
              <Route exact path='/' component={LoginPage} />
              <Route path='/movies' component={MoviesPage} />
              <Route path='/reviews' component={ReviewsPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}
export default App