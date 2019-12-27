import React, { Component } from 'react';
import SignIn from './screen/SignIn/SignIn';
import SignUp from './screen/SignUp/SignUp';
import LandingPage from './screen/UserView/LandingPage/LandingPage'
import UserView from './screen/UserView/UserView'
import history from './helper/history';
import Verify from './screen/UserView/VerificationPage/Verification';
import {  Router , Route } from 'react-router-dom'
import { getHistory,setUser, } from './helper/redux/store/action/action';
import { connect } from 'react-redux';
import firebase from './helper/firebase'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  } 
    }
    componentWillMount(){
        const { setUser } = this.props;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user != null)
    { 
     setUser(user);
    
     if(history.location.pathname=='/' || history.location.pathname=='/User' ||  history.location.pathname==='/signup')
      { history.push('/User/Home'); }
    }
    else
    {
  
    }
  });
        this.props.getHistory(history);
    }
    render() { 
        return ( 
        <Router history={history}>      

            <Route exact path="/" component={SignIn} />
            <Route exact path="/Signup" component={SignUp} />
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
        getHistory: (data) => { dispatch(getHistory(data)) },
        setUser: (user) => { dispatch(setUser(user)) },
    })
  }
export default connect(mapStateToProp, mapDispatchToProp)(App);