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
import './Stepper.css'
const styles = theme => ({
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
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
            skipped:new Set(),
        }
    this.setActiveStep=this.setActiveStep.bind(this);
    this.setSkipped=this.setSkipped.bind(this);
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
    setSkipped(ac){
        this.setState({
            skipped:ac
        })
    }
     getStepContent(step) {
      switch (step) {
        case 0:
          return <CreateCarousel back={this.handleBack} next={this.handleNext}/>;
        case 1:
          return <SelectData back={this.handleBack} next={this.handleNext}/>;
        case 2:
          return <SelectTheme back={this.handleBack} next={this.handleNext}/>;
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
      <div style={{background:'white',width:'85%',marginLeft:'210px'}}>
        <div style={{marginTop:50}}>

        <Stepper activeStep={this.state.activeStep} >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>
                <div 
                style={{background:this.state.activeStep>=index?'#3f51b5':'grey'}}
                className='div'
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

