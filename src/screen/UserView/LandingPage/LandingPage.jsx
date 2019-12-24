import React, { Component } from 'react';

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
  <p style={{marginTop:70,marginLeft:400}}>Landing Page</p>
</div>
  );
}
}

export default LandingPage;