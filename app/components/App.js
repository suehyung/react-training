var React = require('react')
var Nav = require('./Nav')
var Home = require('./Home')
var Battle = require('./Battle')
var Popular = require('./Popular')
// React Router dependencies below
var ReactRouter = require('react-router-dom')
var Router = ReactRouter.BrowserRouter
var Route = ReactRouter.Route
var Switch = ReactRouter.Switch

class App extends React.Component {
  render() {
    return (
      // Insert components inside Router component, specify component path if needed
      <Router>
        <div className = 'container'>
          <Nav />
          <Switch> 
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/popular' component={Popular} />
            <Route render={function(){
              return <p>Page Not Found</p>
            }} />
          </Switch>
      
        </div>
      </Router>
    )
  }
  // 'exact' ensures Home does not load every time 
}

module.exports = App