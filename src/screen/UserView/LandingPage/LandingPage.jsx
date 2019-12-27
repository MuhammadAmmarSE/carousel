import React, { Component } from 'react';
import Carousel from '../../Carousel/Carousel'
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
 <Carousel />
</div>
  );
}
}

export default LandingPage;