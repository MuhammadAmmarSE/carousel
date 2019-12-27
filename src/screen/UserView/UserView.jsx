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
    { const { histor } = this.props;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user != null) {
          if(user.emailVerified==true)
             { 
              histor.push('/User/Home')
             }
             else
             {
               if(histor!='/User/Verify')
               {
                histor.push('/User/Verify')
               }
             }
        
        }
        else {
          histor.push('/')
        }
      });


       
     
    }
      render(){
        
        const {classes}=this.props;
          return (
            <div style={{position:'relative',marginBottom:'64px'}}>
               <AppBar />
               {
this.props.history.location.pathname === '/User/Verify' ?
null:
                 <Drawers />
               }
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