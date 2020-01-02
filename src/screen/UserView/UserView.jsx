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
      const user=  firebase.auth().currentUser;
    const global = this;
      db.collection("Users").doc(user.uid).get().then( function (doc){
        if (doc.exists) {
          
          var data = {
            name: doc.data().name,
            LastLogin:doc.data().LastLogin,
            MemberType:doc.data().MemberType,
            UserSince:doc.data().UserSince,
            credits:doc.data().credits,
            email:doc.data().email,
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
          name: user.data().displayName,
          LastLogin:date,
          MemberType:'guest',
          UserSince:date,
          credits:0,
          email:user.data().email
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
    { 
      const { histor} = this.props;
      var user = firebase.auth().currentUser;
      if(user)
      {
         
        if(user.emailVerified===true)
        { 
          this.checkUser();
          let path=histor.location.pathname;
          if(path==='/User/Verify')
          {
            histor.push('/User/Home')
          }
          else if (path==="/User")
          {
            histor.push('/User/Home')
          }
        }
        else
        { console.log(user)
          histor.push('/User/Verify') 
        }
      }
      else histor.push('/');
}
       
     
    

      render(){
        
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