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
import './Stepper.css';
import img1 from './StepperScreens/CreateCarousel/stepper.png'

const styles = theme => ({
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      // marginTop: theme.spacing(1),
      // marginBottom: theme.spacing(1),
    },
  });

  function getSteps() {
    return ['Create Carousel', 'Select Data', 'Select Theme','Theme Configure','Embed In Webpage'];
  }
  


  
 class HorizontalLinearStepper extends Component {
    constructor(props){
        super(props)
        this.state={
            activeStep:0,
            Name:'',
            Url:'',
            Data:[],
            // [    first  object     [{'Title':'Data'},{'Title':'Data'},{'Title':'Data'}] 
            //      second object     [{'Title':'Data'},{'Title':'Data'},{'Title':'Data'}]  
           //       third  object     [{'Title':'Data'},{'Title':'Data'},{'Title':'Data'}]
           //       ...                                                                  
           //                                                                            ]
           selectedData:[],
           Placement:[{Header:'',Footer:'',image:''}] ///theme ke options

        }
    this.setActiveStep=this.setActiveStep.bind(this);
    
    }
    handleBack = () => {
        this.setActiveStep(this.state.activeStep - 1);
    };
    handleNext = () => {
     if(this.props.carousalName == ''){
       alert('Enter Carousel Name')
     }
     else if(this.props.url ==''){
      alert('Enter URL')
    }
    else{
      this.setActiveStep(this.state.activeStep + 1);
    }
    };
    setActiveStep(ab){
        this.setState({
            activeStep:ab
        })
    }

    CChandleNext = (carousalName,url) => {
      this.setState({Name: carousalName,Url:url});
      console.log('cc', carousalName)
  }
   
     getStepContent(step) {
      switch (step) {
        case 0:
          return <CreateCarousel back={this.handleBack} next={this.handleNext} handleNext={this.CChandleNext.bind(this)}/>;
          case 1:
            return <SelectData back={this.handleBack} next={this.handleNext}/>;
            case 2:
              return <SelectTheme back={this.handleBack} next={this.handleNext}/>;
              case 3:
                return <ThemeConfig back={this.handleBack} next={this.handleNext}/>;
        default:
          return 'Unknown step';
      }
    }
    render(){
        const {classes}=this.props;
        const steps = getSteps();
      
        const handleReset = () => {
            this.setActiveStep(0);
        };
    return (
      <div style={{minHeight:'calc(100vh - 146px)',background:'#e5e5e5',width:'calc(100% - 240px)',marginLeft:'240px',}}>
        <div >

        <Stepper activeStep={this.state.activeStep} style={{height:'80px'}}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>
                 
                <div 
                style={{backgroundImage: "url("+img1+")",width: '170px',height: '50px',marginTop:-2}}
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
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{this.getStepContent(this.state.activeStep)}</Typography>
            </div>
          )}
        </div>
      </div>
   );
}
}

export default withStyles(styles)(HorizontalLinearStepper);

