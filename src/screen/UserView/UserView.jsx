import React, { Component } from 'react';
import AppBar from '../../staticViews/Appbar/Appbar'
import Drawers from '../../staticViews/Drawer/Drawer'
import firebase from '../../helper/firebase'
import { connect } from 'react-redux';
import {setUser,userData} from '../../helper/redux/store/action/action';
class UserView extends Component {
  constructor(props){
      super(props);
      this.state={
       
      }
    }


    checkUser=()=>{

      var db = firebase.firestore();
      const user= this.props.getUser;
    const global = this;
      db.collection("Users").doc(user.uid).get().then( function (doc){
        if (doc.exists) {
          var data = {
            name: doc.name,
            LastLogin:doc.LastLogin,
            MemberType:doc.MemberType,
            UserSince:doc.UserSince,
            credits:doc.credits,
            email:doc.email,
          }
          global.props.userData(data);
      } 
      else {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        db.collection("Users").doc(user.uid).set({
          name: user.displayName,
          LastLogin:date,
          MemberType:'guest',
          UserSince:date,
          credits:0,
          email:user.email
      })
      .then(function() {
        var data = {
          name: user.displayName,
          LastLogin:date,
          MemberType:'guest',
          UserSince:date,
          credits:0,
          email:user.email
        }
        this.props.userData(data);
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
      } 
      })
      };


    componentDidMount()
    { const { histor,setUser } = this.props;
    const global = this
      firebase.auth().onAuthStateChanged(function(user) {
        if (user != null) {
         setUser(user);
          if(user.emailVerified==true)
             { 
              global.checkUser();
               
               if( histor.location.pathname == '/User'){
                 
                histor.push('/User/Home')

                }
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
            histor:state.root.getHis,
            getUser:state.root.setUser,
          })
        }
        function mapDispatchToProp(dispatch) {
          return ({
            setUser: (user) => { dispatch(setUser(user)) },
            userData: (data) => {dispatch(userData(data))},
          })
        }
        export default connect(mapStateToProp, mapDispatchToProp)(UserView);