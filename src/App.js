import React, { Component } from 'react';
import SignIn from './screen/SignIn/SignIn';
import SignUp from './screen/SignUp/SignUp';
import LandingPage from './screen/UserView/LandingPage/LandingPage'
import UserView from './screen/UserView/UserView'
import history from './helper/history';
import Verify from './screen/UserView/VerificationPage/Verification';
import Profile from './screen/UserView/Profile/Profile';
import Settings from './screen/UserView/Settings/Settings';



import Stepper from './screen/UserView/Stepper/Stepper'
import {  Router , Route } from 'react-router-dom'
import { getHistory,setUser, } from './helper/redux/store/action/action';
import { connect } from 'react-redux';

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import firebase from './helper/firebase'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { checked:false} 
    }
    componentWillMount(){ 
        const { setUser } = this.props;
       let global=this;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user != null)
    {  
     setUser(user);
     global.setState({checked:true});
    let path=history.location.pathname.toString().toUpperCase();
    
     if(path==='/' || path==='/USER' ||  path==='/SIGNUP' || path==='/SIGNIN')
      { history.push('/User/Home'); }
    }
    else
    {
      global.setState({checked:true})
    }
  });
        this.props.getHistory(history);
    }
    render() { 
        return ( 
this.state.checked==true?
        <Router history={history}>      

            <Route exact path="/" component={SignIn} />
            <Route exact path="/Signup" component={SignUp} />
            <Route path="/User" component={UserView} />
            <Route exact path="/User/Home" component={LandingPage} />
            <Route exact path="/User/Verify" component={Verify}/>
            <Route exact path="/User/Carousel" component={Stepper}/> 
            <Route exact path="/User/Profile" component={Profile}/>
        </Router>
        :
        <div style={{background:'',position: 'fixed',top: '50%',left: '50%', transform: 'translate(-50%, -50%)'}}>
          <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
          />
        </div>
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