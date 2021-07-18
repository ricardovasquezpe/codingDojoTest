import React from 'react'
import { LoginPage } from './core/login'
import { MoviesPage } from './core/movies'
import { ReviewsPage } from './core/reviews'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const App: React.FC = () => {
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
export default App