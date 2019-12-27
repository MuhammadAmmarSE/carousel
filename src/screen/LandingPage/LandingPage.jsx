import React, { Component } from 'react';
import AppBar from '../../staticViews/Appbar/Appbar'
import Drawers from '../../staticViews/Drawer/Drawer'
import Carousel from '../Carousel/Carousel'
class LandingPage extends Component {
  constructor(props) {
      super(props);
      this.state = { 
          Firstname: '',
    Lastname: '',
    email: '',
    password: '',
    Logo: false,
    fnames:false,
    lastNames:false,
    emails:false,passwords:false
       }
  }

  render() { 
    const { classes } = this.props;
    return ( 
<div>
{/* <AppBar />
<Drawers /> */}
<Carousel />
</div>
  );
}
}

export default LandingPage;