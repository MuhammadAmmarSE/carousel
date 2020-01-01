import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import PasswordDialog from './PasswordDialog';
import EmailDialog from './EmailDialog';
import NameDialog from './NameDialog';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import './Profile.css'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  NdialogOpen:false,EdialogOpen:false, PdialogOpen:false, email:null,name:null,credits:null,lastLogin:null, memberType:null , userSince:null ,oldpassword:null }
    }

    componentDidUpdate(prevProps) {
      

      if(this.props.user!=undefined)
      {
        if(prevProps.user==undefined && this.props.user !== null)
        {
          this.setState({name:this.props.user.name , email:this.props.user.email,credits:this.props.user.credits,lastLogin:this.props.user.LastLogin,memberType:this.props.user.MemberType,userSince:this.props.user.UserSince,})
        }
        else if (this.props.user !== prevProps.user && this.props.user !== null) {
          this.setState({name:this.props.user.name , email:this.props.user.email,credits:this.props.user.credits,lastLogin:this.props.user.LastLogin,memberType:this.props.user.MemberType,userSince:this.props.user.UserSince,})
        }
      }
        
      }

      componentDidMount()
      {  
        if(this.props.user!=undefined)
        {
          if ( this.props.user && this.props.user !== null)
          {
            this.setState({name:this.props.user.name , email:this.props.user.email,credits:this.props.user.credits,lastLogin:this.props.user.LastLogin,memberType:this.props.user.MemberType,userSince:this.props.user.UserSince,})
          }
        }
          
      }

       PhandleClickOpen = () => {
        this.setState({PdialogOpen:true});
      };
    
       PhandleClose = () => {
        this.setState({PdialogOpen:false});
      };

      EhandleClickOpen = () => {
        this.setState({EdialogOpen:true});
      };
    
       EhandleClose = () => {
        this.setState({EdialogOpen:false});
      };

      NhandleClickOpen = () => {
        this.setState({NdialogOpen:true});
      };
    
       NhandleClose = () => {
        this.setState({NdialogOpen:false});
      };

      
     


    render() { 
        return ( 
        
            this.state.email!=null?<div style={{marginLeft:'240px',padding:'30px'}}>
             

              <PasswordDialog open={this.state.PdialogOpen} handleClose={this.PhandleClose}  />
              <EmailDialog    open={this.state.EdialogOpen} handleClose={this.EhandleClose}  />
              <NameDialog     open={this.state.NdialogOpen} handleClose={this.NhandleClose}  />
                <span className="ProfileBlock">
                  <span className="ProfileText1" > Name :  {this.state.name} </span>
                  <span className="ProfileIcon1" >
                  <IconButton aria-label="edit"  size="small" onClick={this.NhandleClickOpen}>
                     <EditIcon fontSize="inherit" />
                    </IconButton>
                  </span>
                    
                </span>
                <br/> <br/>

                <span className="ProfileBlock">
                   <span  className="ProfileText1"> Email:          {this.state.email} </span>
                   <span  className="ProfileIcon1">
                     <IconButton aria-label="edit"  size="small">
                       <EditIcon  fontSize="inherit" />
                     </IconButton>
                   </span>
                </span>
                <br/> <br/>

                <span className="ProfileBlock">
                 <span  className="ProfileText1"> Credits :       {this.state.credits} </span>
                 {/* <span  className="ProfileIcon1">
                   <IconButton aria-label="edit"  size="small">
                     <EditIcon  fontSize="inherit" />
                   </IconButton>
                  </span> */}
                </span>
                <br/> <br/>

              

                <span className="ProfileBlock">
                 <span  className="ProfileText1"> Last Login :    {this.state.lastLogin} </span>
                 {/* <span  className="ProfileIcon1">
                     <IconButton aria-label="edit"  size="small">
                      <EditIcon fontSize="inherit" />
                     </IconButton>
                 </span> */}
                </span>
                <br/> <br/>

                <span className="ProfileBlock">

                   <span  className="ProfileText1">
                     Account Since : {this.state.userSince}
                   </span>

                   {/* <span  className="ProfileIcon1">
                     <IconButton aria-label="edit"  size="small">
                      <EditIcon fontSize="inherit" />
                     </IconButton>
                   </span> */}

                </span>
                <br/> <br/> 
                
                <Button variant="contained" onClick={this.PhandleClickOpen}> Change Password </Button>

            </div>
            :
            <div style={{background:'',position: 'fixed',top: '50%',left: '50%', transform: 'translate(-50%, -50%)'}}>
              <Loader
              type="RevolvingDot"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
              />
            </div>
        
        );
    }
}

function mapStateToProp(state) {
    return ({
      user:state.root.userData,
        // email:state.root.userDataemail,
        // name:state.root.userDataname,
        // credits:state.root.userDatacredits,
        // lastLogin:state.root.userDataLastLogin,
        // memberType:state.root.userDataMemberType,
        // userSince:state.root.userDataUserSince,

       
    })
  }
 
export default connect(mapStateToProp)(Profile) ;