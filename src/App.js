import React, { Component } from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import "./variables.scss";
import "./styles.scss";

import Home from "./pages/Home";
import Listing from "./pages/Listing";
import Map from "./pages/Map";
import NotFound from "./pages/NotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" >
          <Switch>
            <Route path="/listing/:id" component={Listing}/>
            <Route exact path="/search/:locFriendly/:locCode?" component={Home}/>
            <Route exact path="/" component={Home}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
