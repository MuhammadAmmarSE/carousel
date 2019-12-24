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
      /* if(user in redux)
           {
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
           
           */
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

        export default UserView;