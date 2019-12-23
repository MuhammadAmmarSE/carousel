import React, { Component } from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Logo from '../../Assets/loader.gif';
import firebase from '../../helper/firebase'
import Swal from 'sweetalert2';

import './SignUp.css'



const styles = theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  
  });









class SignUp extends Component {
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
         this.signup = this.signup.bind(this)
    }

    componentDidMount()
    {
        // if already signedIn-- then route to Homepage
    }
    async signup() {
        ////////////
        const { email, password, Firstname, Lastname } = this.state;
     if ( Firstname == '') {
      this.setState({
        fnames:true
      },()=>{
        setTimeout(() => {
            this.setState({fnames:false,text:'Coudnot recognize  your email'})
         }, 4000);
      })
          }
          else if ( Lastname == '') {
            this.setState({
              lastNames:true
            },()=>{
                setTimeout(() => {
                  this.setState({lastNames:false,text:'Coudnot recognize  your email'})
               }, 4000);
            })
                }
    else if (email == '') {
this.setState({
  emails:true
},()=>{
    setTimeout(() => {
      this.setState({emails:false,text:'Coudnot recognize  your email'})
      console.log('email empty')
   }, 4000);
})
    }
    else if ( password == '') {
      this.setState({
        passwords:true
      },()=>{
        setTimeout(() => {
            this.setState({passwords:false,text:'Coudnot recognize  your email'})
         }, 4000);
      })
          }
  
  else if (email !== '', password !== '', Firstname !== '', Lastname !== '') {
    console.log(email,password,Firstname,Lastname)

        firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
            console.log("user=================>",user)
            // this.props.history.push('/StartPage')
        })
        .then(() => {
        // var authValues = authState.auth().sendEmailVerification();
        //  authState.auth().sendEmailVerification();
        var user=firebase.auth().currentUser;
        user.sendEmailVerification().then((result) =>{
            console.log("sent========>")
        
        }).catch((error)=>{
            console.log("error",error)
    
        })
            let userobject=
            {
                email,
                password,
                Firstname,
                Lastname
            }
           // firebase.database().ref('UserInfo/').push(userobject);
           var userkey= firebase.database().ref('UserInfo/').push(userobject).key;
           console.log(userkey,'authValues')
           this
           .props
           .history
           .push('/');
           Swal.fire({
            title:'Sucess',
            text:'Successfully Sign Up',
            icon:'success',
            button:'Go'
           })
          })
        .catch((error)=>{
            Swal.fire(error.message,'Something wrong','warning')
    
        })    
    }
    else{
        console.log("error")
      }

    }
    GoSignIn=()=>{
        this.props.history.push('/');
    }
    render() { 
        const { classes } = this.props;
        return ( 
        // <div>
        //     <div id="SignUpScreenDiv">SignUp Page</div>
        // </div>
        <div>{this.state.Logo ? <img src={Logo} /> :
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit">
                Welcome To Signup Page
          </Typography>
            </Toolbar>
          </AppBar>

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
        </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                     error={this.state.fnames}
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={(e) => { this.setState({ Firstname: e.target.value }) }}
                    />
                       {
            this.state.fnames?
            <h4 style={{color:'red',fontSize:10,marginLeft:20,marginTop:5}}>Enter First Name</h4>:null
        }
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                  error={this.state.lastNames}
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      onChange={(e) => { this.setState({ Lastname: e.target.value }) }}

                    />
                                {
            this.state.lastNames?
            <h4 style={{color:'red',fontSize:10,marginLeft:20,marginTop:5}}>Enter Last Name</h4>:null
        }
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={this.state.emails}
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => { this.setState({ email: e.target.value }) }}
                    />
                                          {
            this.state.emails?
            <h4 style={{color:'red',fontSize:10,marginLeft:20,marginTop:5}}>Enter Email</h4>:null
        }
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                    error={this.state.passwords}
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(e) => { this.setState({ password: e.target.value }) }}
                    />
                                                        {
            this.state.passwords?
            <h4 style={{color:'red',fontSize:10,marginLeft:20,marginTop:5}}>Enter Password</h4>:null
        }
                  </Grid>
                </Grid>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.signup}>
                  Sign Up
          </Button>
        <Toolbar style={{marginLeft:60,marginTop:-20}}>
                     <Typography  component="h6" variant="h6" style={{fontSize:14,color:'gray',fontWeight:'600',textAlign:'center'}}>
                     Already Joined Us , &nbsp;
        </Typography>
        <Typography className='typo' onClick={this.GoSignIn.bind(this)} component="h6" variant="h6" style={{fontSize:14,color:'#3f51b5',fontWeight:'600',textAlign:'center', cursor: 'pointer'}}>
        Sign In ?
        </Typography>
        </Toolbar>

                <Grid container justify="flex-end">


                </Grid>
              </form>
            </div>
            <Box mt={5}>
            </Box>
          </Container>
 
        </div>
      }</div>
        );
    }
}
export default withStyles(styles)(SignUp);