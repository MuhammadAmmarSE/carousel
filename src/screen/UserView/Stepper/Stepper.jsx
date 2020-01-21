import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateCarousel from './StepperScreens/CreateCarousel/CreateCarousel';
import SelectData from './StepperScreens/SelectData/SelectData';
import SelectTheme from './StepperScreens/SelectTheme/SelectTheme';
import ThemeConfig from './StepperScreens/ThemeConfig/ThemeConfig';
import EmbedWebpage from './StepperScreens/EmbedWebpage/EmbedWebpage.js';
import firebase from '../../../helper/firebase'

import {userData} from '../../../helper/redux/store/action/action';


import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



import { connect } from 'react-redux';


import './Stepper.css';
import img1 from './stepper1.png'
import img2 from './stepper2.png'

const theme1='https://redstapler.co/wp-content/uploads/2019/10/rpg-css-card-design-800x500.jpg'
const theme2='https://creativetimblog.com/blog/wp-content/uploads/2015/03/Rotating-Cards-730x410.jpg'
const theme3='https://freefrontend.com/assets/img/css-cards/CSS-Same-Height-Cards.jpg'

const styles = theme => ({
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      // marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  });

  function getSteps() {
    return ['Create Carousel', 'Select Data', 'Select Theme','Theme Configure','Export'];
  }
  


  
 class HorizontalLinearStepper extends Component {
    constructor(props){
        super(props)
        this.state={
            activeStep:0,
            Name:'',
            Url:'',
            Data:[],
            // [    first  array     [{'Title':'Data'},{'Title':'Data'},{'Title':'Data'}] 
            //      second array     [{'Title':'Data'},{'Title':'Data'},{'Title':'Data'}]  
           //       third  array     [{'Title':'Data'},{'Title':'Data'},{'Title':'Data'}]
           //       ...                                                                  
           //                                                                            ]
           selectedData:[],
           Placement:[], ///theme ke options
           ThemeBluePrint:null,
           Noc:null,
           MetaTags:[],
           loader:false,

        }

    this.setActiveStep=this.setActiveStep.bind(this);
    
    }

    componentDidUpdate(prevProps) {
      

      if(this.props.userData!==undefined)
      {
        if(prevProps.userData===undefined && this.props.userData !== null)
        {
          this.setState({username:this.props.userData.name , email:this.props.userData.email,credits:this.props.userData.credits,lastLogin:this.props.userData.LastLogin,memberType:this.props.userData.MemberType,userSince:this.props.userData.UserSince,})
        }
        else if (this.props.userData !== prevProps.userData && this.props.userData !== null) {
          this.setState({username:this.props.userData.name , email:this.props.userData.email,credits:this.props.userData.credits,lastLogin:this.props.userData.LastLogin,memberType:this.props.userData.MemberType,userSince:this.props.userData.UserSince,})
        }
      }
        
      }

      componentDidMount()
      {  
        if(this.props.userData!==undefined)
        {
          if ( this.props.userData && this.props.userData !== null)
          {
            this.setState({username:this.props.userData.name , email:this.props.userData.email,credits:this.props.userData.credits,lastLogin:this.props.userData.LastLogin,memberType:this.props.userData.MemberType,userSince:this.props.userData.UserSince,})
          }
        }
          
      }
    getThumbnail = () => {
      if(this.state.ThemeBluePrint==1)
      {
        return theme1;
      }
      else if(this.state.ThemeBluePrint==2)
      {
        return theme2;
      }
      else if(this.state.ThemeBluePrint==3)
      {
        return theme3;
      }
    }
    handleBack = () => {
        this.setActiveStep(this.state.activeStep - 1);
    };
    handleNext = () => {

      if(this.state.credits==undefined)
      {
         alert('Please wait')
         return;
      }
      else if(this.state.credits<1)
      {
        alert('Please Recharge your account!')
        return;
      }
      else if(this.state.activeStep==3)
      { 
        this.setState({loader:true})
        let global=this;
        let db = firebase.firestore();
        db.collection('Users').doc(this.props.user.uid).collection('Themes').add({
          Name: this.state.Name,
          Noc: this.state.Noc,
          ThemeBluePrint:this.state.ThemeBluePrint,
          Thumbnail:this.getThumbnail(),
          Url:this.state.Url,
          Placement:this.state.Placement,
          MetaTags:this.state.MetaTags,
          }).then(function(){
        db.collection('Users').doc(global.props.user.uid).update({credits:global.state.credits-1}).then(
          function(){


            let data = JSON.stringify(global.props.userData)
            data=JSON.parse(data);
            data["credits"]=global.state.credits-1;
            
            global.props.setData(data);
            global.setState({activeStep:global.state.activeStep + 1,loader:false});
            
          }
        )
        

      })
      }
     
      else
      {
        this.setActiveStep(this.state.activeStep + 1);
      }
    }


    setActiveStep(step)
    {
      this.setState({ activeStep:step })
    }

    CChandleNext = (carousalName,url) => 
    {
      this.setState({Name: carousalName,Url:url});
    }

    SDhandleNext = (data) =>
    {
      this.setState({Data:data});
    }

    SThandleNext = (data) =>
    {
      this.setState({ThemeBluePrint:data});
    }

    TGhandleNext= (placement,noc) =>
    {
      this.setState({Placement:placement,Noc:noc});
    }
   
     getStepContent(step) {
      switch (step) {
        case 0:
          return <CreateCarousel credits={this.state.credits} back={this.handleBack} next={this.handleNext}  handleNext={this.CChandleNext.bind(this)}/>;
          case 1:
            return <SelectData back={this.handleBack} next={this.handleNext}  handleNext={this.SDhandleNext.bind(this)}/>;
            case 2:
              return <SelectTheme back={this.handleBack} next={this.handleNext} handleNext={this.SThandleNext.bind(this)}/>;
              case 3:
                return <ThemeConfig back={this.handleBack} next={this.handleNext} handleNext={(placement,noc)=>this.TGhandleNext(placement,noc)} ThemeBluePrint={this.state.ThemeBluePrint} data={this.state.Data}/>;
                case 4:
                  return <EmbedWebpage back={this.handleBack} next={this.handleNext} Theme={this.state.ThemeBluePrint} Noc={this.state.Noc}/>;
        default:
          return 'Unknown step';
      }
    }

    CreateCarousel() {
      window.location.href = "/User/Carousel";
      
    }
    render(){
        const {classes}=this.props;
        const steps = getSteps();
      
        const handleReset = () => {
            this.setActiveStep(0);
        };
    return (
      <div style={{minHeight:'calc(100vh - 144px)',background:'#f7f8fc',width:'calc(100% - 240px)',marginLeft:'240px',}}>
        <div >

        <Stepper activeStep={this.state.activeStep} style={{background:'',height:'80px'}}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>
                 
                <div 
                style={{backgroundRepeat:'no-repeat',backgroundImage:this.state.activeStep>=index?"url("+img1+")":"url("+img2+")" ,width: '170px',height: '55px',marginTop:'5px'}}
                // className='div'
                >
      <p className='hfive'>
                {label}
      </p>
             
                </div>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
          </div>
        <div>
          {this.state.loader===true?
            <div style={{textAlign:'center',paddingTop:'20px',height:'calc(100vh - 144px)', width:'100%'}}>
              <div style={{background:'',position: 'fixed',top: '50%',left: '50%', transform: 'translate(-50%, -50%)'}}>
                <Loader
                type="RevolvingDot"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
                />
              </div>
            </div>
          
            :this.state.activeStep === steps.length ? (
            <div className="StepperFinishDiv">
              <Typography className={classes.instructions}>
                All steps completed - Carousel Successfully Created 
              </Typography>
              

              <Button
                variant="contained"
                onClick={this
                .CreateCarousel
                .bind(this)}
                style={{display:'block',width:'300px',height:'40px'}}
                color="primary">
                Create Another Carousel
              </Button>

              
            </div>
            ) : (
            <div>
              <span style={{background:'yellow'}}>{this.getStepContent(this.state.activeStep)}</span>
            </div>
            )
          }
        
        </div>
      </div>
   );
}
}

function mapStateToProp(state) {
  return ({
      user:state.root.setUser,
      userData:state.root.userData,
  })
}
function mapDispatchToProp(dispatch) {
  return ({
        setData: (data) => {dispatch(userData(data))},
  })
}



export default  connect(mapStateToProp, mapDispatchToProp)(withStyles(styles)(HorizontalLinearStepper));

