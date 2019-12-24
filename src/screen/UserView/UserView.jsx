import React, { Component } from 'react';
import AppBar from '../../staticViews/Appbar/Appbar'
import Drawers from '../../staticViews/Drawer/Drawer'


class UserView extends Component {
  constructor(props){
      super(props);
      this.state={
       
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

        export default UserView;