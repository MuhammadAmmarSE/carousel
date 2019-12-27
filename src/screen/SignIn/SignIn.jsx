import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from 'react-redux';
import firebase from '../../helper/firebase'

import './SignIn.css';

const style = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },

  paper: {
    marginTop: theme.spacing(8),
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
    margin: theme.spacing(3, 0, 2)
  },

  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {email:'',password:'',error1:false,error2:false,errorMessage:''}
    this.SignIn=this.SignIn.bind(this);
  }

  GoSignUp()
  {
    this
    .props
    .history
    .push('/SignUp');
  }

  SignIn()
  {
    const {email, password} = this.state;
    if(email==="")
    {
        this.setState({error1:true,errorMessage:'Email cannot be empty'})
        return;
    }

    else if(password==="")
    {
        this.setState({error2:true,errorMessage:'Password cannot be empty'})
        return;
    }

    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          if (user.user.emailVerified === true) 
          {
           this.props.history.push('/User/Verify')
          } 
          else {
            // this
            //   .props
            //   .SignInInfo(email)
            this
              .props
              .history
              .push('/User/Home')
          }

        })
        .catch((error) =>{

            console.log('error',error);


            if(error.code==='auth/wrong-password')
            {
                this.setState({ error2:true, errorMessage:"Password Invalid "})
            }

            else if(error.code==='auth/user-not-found')
            {
                this.setState({ error1:true, errorMessage:"User Does Not Exist"})
            }

            else 
            {
                this.setState({error1:true,errorMessage:error.message})
            }

        })

    }

    catch (error) {
        this.setState({
            error1:true,
              errorMessage:error.message
            })
    }

  }


componentDidMount()
{
  console.log(this.props.getHis,'getHis')
  // if already signedIn-- then route to Homepage else
  // if(this.context.state.uid!=null) {   this.context.history.push('./Home') }
}
render() {

  const {classes} = this.props;
  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              Carousel - Welcome To Sign in
            </Typography>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <TextField
                    error={this.state.error1}
                    text={this.state.text}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => {
                    this.setState({error1:false,error2:false,errorMessage:'',email: e.target.value})
                  }}/>
                </Grid>
                {this.state.error1
                  ? <h4
                      style={{
                      color: 'red',
                      fontSize: 10,
                      marginLeft: 20,
                      marginTop: -5
                      }}>
                        {this.state.errorMessage}
                    </h4>
                  : null
              }
              
              < Grid item xs = {
                12
              } > <TextField
                error={this.state.error2}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                this.setState({error1:false,error2:false,errorMessage:'',password: e.target.value})
              }}/> </Grid>
        {
            this.state.error2?
            <h4 style={{color:'red',fontSize:10,marginLeft:20,marginTop:-5}}>{this.state.errorMessage} </h4 >: null
            } </Grid>
        <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={this.SignIn}>SignIn</Button > <Toolbar
              style={{
              marginLeft: 60,
              marginTop: -20
            }}>
              <Typography
                component="h6"
                variant="h6"
                style={{
                fontSize: 14,
                color: 'gray',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                Want to Join Us , &nbsp;
              </Typography>
              <Typography
                className='typo'
                onClick={this
                .GoSignUp
                .bind(this)}
                component="h6"
                variant="h6"
                style={{
                fontSize: 14,
                color: '#3f51b5',
                fontWeight: '600',
                textAlign: 'center',
                 cursor: 'pointer'
              }}>
                Sign Up ?
              </Typography>
            </Toolbar> </form>
        </div > </Container> </div>
        </div>
  );
}
}
function mapStateToProp(state) {
  return ({
    getHis:state.root.getHis,
  })
}
function mapDispatchToProp(dispatch) {
  return ({
     
  })
}
export default connect(mapStateToProp, mapDispatchToProp)(withStyles(style)(SignIn));