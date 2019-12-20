import React, { Component } from 'react';

import SignIn from './screen/SignIn/SignIn';
import SignUp from './screen/SignUp/SignUp';

import history from './helper/history';

import {  Router , Route } from 'react-router-dom'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  } 
    }
    render() { 
        return ( 
        
        <Router history={history}>
                <div>
                    {/* App bar here */} {/*<Route path="/" component={Appbar} />*/}  {/* Default component - check auth here */}
                    <Route exact path="/SignIn" component={SignIn} />
                    <Route exact path="/SignUp" component={SignUp} />
                </div>
        </Router>
      
    );
    }
}
 
export default App;