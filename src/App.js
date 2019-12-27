import React, { Component } from 'react';

import SignIn from './screen/SignIn/SignIn';
// import Verify from './screen/SignIn/Verify/Verify';
import SignUp from './screen/SignUp/SignUp';
import LandingPage from './screen/UserView/LandingPage/LandingPage'
import UserView from './screen/UserView/UserView'
import history from './helper/history';
import Verify from './screen/UserView/VerificationPage/Verification';
import {  Router , Route } from 'react-router-dom'
import { getHistory } from './helper/redux/store/action/action';
import { connect } from 'react-redux';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  } 
    }
    componentWillMount(){
        this.props.getHistory(history);
    }
    render() { 
        return ( 
        
          
        <Router history={history}>
                   
            <Route exact path="/" component={SignIn} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route path="/User" component={UserView} />
            <Route exact path="/User/Home" component={LandingPage} />
            <Route path="/User/Verify" component={Verify}/>
        </Router>
          
      
    );
    }
}
 

function mapStateToProp(state) {
    return ({
    })
  }
  function mapDispatchToProp(dispatch) {
    return ({
        getHistory: (data) => { dispatch(getHistory(data)) }
    })
  }
export default connect(mapStateToProp, mapDispatchToProp)(App);