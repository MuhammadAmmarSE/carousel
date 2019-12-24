import React, { Component } from 'react';
import AppBar from '../../staticViews/Appbar/Appbar'
import Drawers from '../../staticViews/Drawer/Drawer'


class UserView extends Component {
  constructor(props){
      super(props);
      this.state={
       
      }

      
    }
    componentDidMount()
    {
      /* var user = firebase.auth().currentUser;
      if (user) {

         if(user==verified)
             {
               do nothing
             }

             else {
               if(history!=verificationPage)
               {
                 move to verification page
               }
             }
      }

      
      else {
        No user is signed in.
      }
      
           
           */
    }
      render(){
        const {classes}=this.props;
          return (
            <div style={{position:'relative',marginBottom:'64px'}}>
               <AppBar />
              <Drawers />
               </div>

          )
        }
        }

        export default UserView;