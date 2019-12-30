 import React, { Component } from 'react';
 import AppBar from '@material-ui/core/AppBar';
 import CssBaseline from '@material-ui/core/CssBaseline';
 import Toolbar from '@material-ui/core/Toolbar';
 import Typography from '@material-ui/core/Typography';
 import Button from '@material-ui/core/Button';
 import { withStyles } from '@material-ui/core/styles';
 import firebase from '../../helper/firebase.js';
 import { connect } from 'react-redux';


 const drawerWidth = 240;
const styles = theme=> ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});



  class AppBars extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }

    Logout=()=>
    {
      firebase.auth().signOut()
  .then(function() {
    // Sign-out successful.
  
  })
  .catch(function(error) {
    // An error happened
  });
  this.props.histor.push('/')
    }
    
 
 render(){
  const {classes}=this.props;
    return (
      <div className={classes.root}>

<CssBaseline />
<AppBar
  position="fixed"
  className={classes.appBar}
>
  <Toolbar style={{flexDirection:'row',justifyContent:'space-between'}}>
    <Typography variant="h6" noWrap>
      Carousel - Tool
    </Typography>
    <Button color="inherit" onClick={this.Logout} >
      Sign Out
    </Button>
  </Toolbar>
</AppBar>
</div>

);
    }
}
function mapStateToProp(state) {
  return ({
    histor:state.root.getHis,
  })
}




export default connect(mapStateToProp)(withStyles(styles)(AppBars));