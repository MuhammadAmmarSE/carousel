import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Toolbar from '@material-ui/core/Toolbar';
import Swal from 'sweetalert2';

const style = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },

  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },

  submit: {
    // margin: theme.spacing(3, 0, 2),
    width:350,marginLeft:20,marginTop:-50,
    // backgroundColor:'#2979ff',
    fontSize:12
  },

  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  VE:{
    marginTop:-20
  }
});

class Verify extends Component {
  constructor(props) {
    super(props);
   
  }

 

componentDidMount()
{
  // if already signedIn-- then route to Homepage else
  // if(this.context.state.uid!=null) {   this.context.history.push('./Home') }
}

resendEmail=()=>{
  alert('resned') 
  var user = firebase.auth().currentUser;
  user.sendEmailVerification().then((result) =>{
    Swal.fire({
      title:'Sucess',
      text:'Email has been sent!',
      icon:'success',
      button:'Go'
     })
     console.log(result,'result')
  }).catch((error)=>{
    console.log(error)
  })
   this.props.history.push('/')
}

render() {

  const {classes} = this.props;
  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              Carousel
            </Typography>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={classes.paper}>
            {/* <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar> */}
            <h1  style={{fontWeight:'bold'}}>
           Hey There, Saif 
            </h1>
            <Typography component="h5" variant="h6" className={classes.VE}>
           We have sent you a Verification Email 
            </Typography>
            <form className={classes.form} noValidate>
         <Toolbar
              style={{
              marginLeft: 0,
              marginTop: 0
            }}>
             
             </Toolbar> 
            
             <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this
                    .resendEmail
                    .bind(this)}
                  >
              If Didn't not get an email, Resend Email
                  </Button> 
                  
        </form>
        </div > </Container> </div>
        </div>
  );
}
}

export default withStyles(style)(Verify);