import React, { Component } from 'react';

import AppBar from '../../../staticViews/Appbar/Appbar'
import Drawers from '../../../staticViews/Drawer/Drawer'

class LandingPage extends Component {
  constructor(props) {
      super(props);
      this.state = { 
       }
  }

  render() { 
    const { classes } = this.props;
    return ( 
<div>
  <p style={{marginTop:64,marginLeft:300}}>Landing Page</p>
</div>
  );
}
}

export default LandingPage;