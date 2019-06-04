import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Lyrics from './Components/Lyrics';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

export class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/lyrics/track/:id" component={Lyrics} />
            </Switch>
          </div>
        </React.Fragment>
      </Router>
    )
  }
}

export default App




















// import React from 'react';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
      
//     </div>
//   );
// }

// export default App;