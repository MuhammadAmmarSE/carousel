import React, { Component } from 'react';
import './verification.css';
import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';
import { IconButton } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Swal from 'sweetalert2';
import firebase from '../../../helper/firebase'


class Verification extends Component {
    constructor(props) {
        super(props);
        this.state = { value:0,  }
        this.handleNext=this.handleNext.bind(this);
        this.handleBack=this.handleBack.bind(this);
    }
    
    handleNext()
    {
        this.setState({value:1})
    }
    handleBack()
    {
        this.setState({value:0})
    }
    resendEmail=()=>{
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
        return ( <div style={{background:'#F7F8FC',width:'100%',height:'calc(100vh - 64px)'}}>
            
            <Paper class="VerificationText" id="VerificationPaper">

                <SwipeableViews index={this.state.value} >
                    <div>
                        <h1> Please Verify Your Email </h1> 
                        We have emailed you a verification link on your registered email.
                        <br/>
                        <br/>
                        Please click on the link sent for verifying your email.
                        If you have not received the email, click on the link below to resend the verification email.
                        <br/><br/>
                        <a href="" onClick={this
                    .resendEmail
                    .bind(this)}>Resend Verification Email</a>
                        
                        <br/>
                        
                        <br/>

                        Still Having Problems ... 
                        <IconButton onClick={this.handleNext} color="primary"  component="span">
                            <NavigateNextIcon />
                        </IconButton>
                    </div>
                    

                    <div style={{paddingTop:'40px'}}>
                        <b> I haven't received an email from Carousel</b><br/>
                        Check your spam mailbox , <a href="" onClick={this.resendEmail.bind(this)}>Click Here to send another email to yourself</a>

                        <br/>
                        <br/>

                        <b> I need to change my email address</b><br/>
                        You registered with  abcd.com  <a href="">Click Here to change your email address</a>

                        <br/>
                        <br/>

                        <b> I am still having trouble</b><br/>
                        If you are still having trouble verifying your email address, drop us a line. <a href="">Contact the Help Center</a>
                       <br/>

                       <div style={{position:'relative',bottom:'0px',float:'right',}}>
                       <IconButton onClick={this.handleBack} color="primary" component="div">
                            <NavigateBeforeIcon />
                        </IconButton>
                       </div>
                        
                    </div>
                </SwipeableViews>

            </Paper>
            
        </div> );
    }
}
 
export default Verification;