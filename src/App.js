import React, { Component } from 'react';

import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

import history from './history';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <div>
            <Router history={history}>
                <div>
                <Route path="/" component={SignIn} />
                <Route exact path="/SignIn" component={SignIn} />
                <Route exact path="/SignUp" component={SignUp} />
                </div>
            </Router>
        </div>  );
    }
}
 
export default App;