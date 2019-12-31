import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  user: null }
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps)
        if (this.props.User !== prevProps.User && this.props.User !== null) {
          this.setState({user:this.props.User})
        }
        
      }

      componentDidMount()
      {
        if (this.props.User !== null) {
            this.setState({user:this.props.User})
          }
          
      }


    render() { 
        return ( 
        
            <div>
                {console.log(this.state.user)}
                Name : abcd
                Email: abcd
                <Button> Change Password </Button>


            </div>
        
        );
    }
}

function mapStateToProp(state) {
    return ({
        User:state.root.userDataemail,
    })
  }
 
export default connect(mapStateToProp)(Profile) ;