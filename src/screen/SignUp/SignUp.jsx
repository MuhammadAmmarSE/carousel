import React, { Component } from 'react';

import './SignUp.css'
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount()
    {
        // if already signedIn-- then route to Homepage
    }
    render() { 
        return ( 
        <div>
            <div id="SignUpScreenDiv">SignUp Page</div>
        </div> );
    }
}
 
export default SignUp;