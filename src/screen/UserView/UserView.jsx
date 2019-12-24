import React, { Component } from 'react';
import AppBar from '../../staticViews/Appbar/Appbar'
import Drawers from '../../staticViews/Drawer/Drawer'
import firebase from '../../helper/firebase'
import { connect } from 'react-redux';

class UserView extends Component {
  constructor(props){
      super(props);
      this.state={
       
      }
    }

    componentDidMount()
    {
       var user = firebase.auth().currentUser;
       const { history } = this.props;
      if (user) {
         if(user.emailVerified==true)
             { 
              history.push('/UserView/LandingPage')
             }
             else {
               if(this.props.histor!='/Verify')
               {
                history.push('/Verify')
               }
             }
        console.log(user,'user')
      }
      else {
        history.push('/')
      }  
    }
      render(){
        
        const {classes}=this.props;
          return (
            <div >
               <AppBar />
                <Drawers />
               </div>

          )
        }
        }
        function mapStateToProp(state) {
          return ({
            histor:state.root.getHis
          })
        }
        function mapDispatchToProp(dispatch) {
          return ({

          })
        }
        export default connect(mapStateToProp, mapDispatchToProp)(UserView);