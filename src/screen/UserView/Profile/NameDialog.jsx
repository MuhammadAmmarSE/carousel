import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import {userData} from '../../../helper/redux/store/action/action';



import firebase from '../../../helper/firebase';

const useStyles = makeStyles(theme => ({
  
    margin: {
      margin: theme.spacing(1),
    },
   
    textField: {
      width: 200,
    },
  }));


  function FormDialog(props) {
    const classes = useStyles();
  
    
    const [name, setName] = React.useState(false);

    const [errorMessage, setErrorMessage] = React.useState(null);
   
   

   

    

    const handleChange = (e) => 
    {
        setName(e.target.value)
        setErrorMessage(null);
    } 

   
  
      const updateUserName = () =>
      { 
        var db = firebase.firestore();
        let user = firebase.auth().currentUser;
       

        db.collection("Users").doc(user.uid).update({
          name: name
      })
      .then(function() {

        
        let data = JSON.stringify(props.user)
        data=JSON.parse(data);
        data["name"]=name;
        
        props.userData(data);
        props.handleClose();
      })
      .catch(function(error) {
          setErrorMessage(error.message);
      });

      }
  
  
    return (
      
    
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">     
          <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter your new Username
                </DialogContentText>
                <TextField
                autoFocus
                margin="dense"
                id="name"
                label="User Name"
                type="text"
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
              <Button onClick={updateUserName} color="primary">
                  Update
              </Button>
          </DialogActions>

            
               
           
           
        </Dialog>
     
    );
  }

  function mapStateToProp(state) {
    return ({
      user:state.root.userData,
    })
  }
  function mapDispatchToProp(dispatch) {
    return ({
      userData: (data) => {dispatch(userData(data))},
    })
  }
  export default connect(mapStateToProp, mapDispatchToProp)(FormDialog);


  