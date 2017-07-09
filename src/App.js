import React, { Component } from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import './reset.scss';
import './variables.scss';

import Home from './pages/Home/Home';
import Results from './pages/Results/Results';
import Map from './pages/Map/Map';
import NotFound from './pages/NotFound/NotFound';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App" >
                    <Switch>
                        <Route path="/results" component={Results}/>
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
