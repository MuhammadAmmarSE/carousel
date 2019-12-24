import React, { Component } from 'react';

import SignIn from './screen/SignIn/SignIn';
import Verify from './screen/SignIn/Verify/Verify';
import SignUp from './screen/SignUp/SignUp';
import LandingPage from './screen/UserView/LandingPage/LandingPage'
import UserView from './screen/UserView/UserView'
import history from './helper/history';
import {  Router , Route } from 'react-router-dom'
import {Provider} from 'react-redux';
import store from './helper/redux/store';
import { getHistory } from './helper/redux/store/action/action';
import { connect } from 'react-redux';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  } 
    }
    componentDidMount(){
        this.props.getHistory(history);
    }
    render() { 
        return ( 
        
          
        <Router history={history}>
                    {/* App bar here */} {/*<Route path="/" component={Appbar} />*/}  {/* Default component - check auth here */}
                    <Route exact path="/" component={SignIn}  history={history} />
                    <Route exact path="/SignUp" component={SignUp} history={history}/>
                    <Route exact path="/Verify" component={Verify} history={history}/>
                    <Route path="/UserView" component={UserView} history={history}/>
                    <Route exact path="/UserView/LandingPage" component={LandingPage} history={history}/>
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