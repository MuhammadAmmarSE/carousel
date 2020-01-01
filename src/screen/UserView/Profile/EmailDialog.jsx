import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SwipeableViews from 'react-swipeable-views';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';



import firebase from '../../../helper/firebase';

const useStyles = makeStyles(theme => ({
  
    margin: {
      margin: theme.spacing(1),
    },
   
    textField: {
      width: 200,
    },
  }));


export default function FormDialog(props) {
    const classes = useStyles();


    const [open, setOpen] = React.useState(false);
    const [password, setPassword] = React.useState('');

    const [newPassword, setNewPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState(null);
    const [value, setValue] = React.useState(0);

   

   const reAuth = () =>
    {
      let user = firebase.auth().currentUser;
      let credential=firebase.auth.EmailAuthProvider.credential(user.email.toString(),password.toString());
      user.reauthenticateWithCredential(credential).then(function() {
        // User re-authenticated.
        setValue(1);
        setErrorMessage(null);
      }).catch(function(error) {
        // An error happened.
        setErrorMessage('Incorrect Password');
      });
    }

    

    const handleChange = (e) => 
    {
        setPassword(e.target.value)
        setErrorMessage(null);
    } 

    const handleNewPassword = (e) => 
    {
        setNewPassword(e.target.value)
        setErrorMessage(null);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
      };
    
      const handleMouseDownPassword = event => {
        event.preventDefault();
      };
  
      const updatePassword = () =>
      {
        let user = firebase.auth().currentUser;
        user.updatePassword(newPassword).then(function() {

            setErrorMessage(null);
            setValue(2);
          }).catch(function(error) {
            // An error happened.
            setErrorMessage(error.message);
            console.log(error)
          });

      }
  
  
    return (
      
    
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
           <SwipeableViews index={value} >
               <div>
                   <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                   <DialogContent>
                        <DialogContentText>
                            To change Password, please enter your current password here.
                        </DialogContentText>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="password"
                            fullWidth
                            onChange={handleChange}
                            />
                            {errorMessage
                                ? <h4
                                    style={{
                                    color: 'red',
                                    fontSize: 14,
                                    marginLeft: 0,
                                    marginTop: 0
                                    }}>
                                        {errorMessage}
                                    </h4>
                                : null
                            }
                    </DialogContent>
                    
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={reAuth} color="primary">
                            Next
                        </Button>
                    </DialogActions>

               </div>
               {value==1 && <div>
                   <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                   <DialogContent>
                        <DialogContentText>
                            Be Safe and Secure, Set a Strong Password
                        </DialogContentText>
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={handleNewPassword}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                        </FormControl>

                            {errorMessage
                                ? <h4
                                    style={{
                                    color: 'red',
                                    fontSize: 14,
                                    marginLeft: 0,
                                    marginTop: 0
                                    }}>
                                        {errorMessage}
                                    </h4>
                                : null
                            }
                    </DialogContent>
                    
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={updatePassword} color="primary">
                        Set New Password
                        </Button>
                    </DialogActions>
               </div>}

               { value==2 &&
                   <div>
                       <DialogTitle id="form-dialog-title">Password Changed</DialogTitle>
                       <DialogContent>
                            <DialogContentText>
                                Be Safe and Secure, Set a Strong Password
                            </DialogContentText>
                       </DialogContent>
                    
                        <DialogActions>
                            <Button onClick={props.handleClose} color="primary">
                                Done
                            </Button>
                        </DialogActions>

                   </div>
               }
         
           
           </SwipeableViews>
           
           {/* <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={props.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions> */}
        </Dialog>
     
    );
  }