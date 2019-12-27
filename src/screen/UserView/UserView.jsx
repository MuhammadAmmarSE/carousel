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
      console.log(this.props.histor,'history')
       var user = firebase.auth().currentUser;
       const { history } = this.props;
      if (user) {
         if(user.emailVerified==false)
             { 
              history.push('/User/Home')
             }
             else {
               if(this.props.histor!='/User/Verify')
               {
                history.push('/User/Verify')
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