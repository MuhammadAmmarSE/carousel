import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';

  const styles = theme => ({
   
  });


class SelectTheme extends Component {

  constructor(props){
    super(props)
    this.state = {
        activeStep:0,
        colorback:'white',
         selectedTheme:0,
         index:0,
         direction:'',
    }

}
 handleNext = () => {
  this.props.next()  
};
setIndex(){
  this.setState({
    index:this.state.index+1,
  })
}
setDirection(event){
  this.setState({
    index:this.state.index-1,
     direction:event
  })
}

ControlledCarousel() {
 const handleSelect = (selectedIndex, e) => {
   if(e === 'next'){
      if(this.state.selectedTheme >= 1){
        console.log('big')
      }
      else{
        this.setIndex(selectedIndex);
        this.setState({
          selectedTheme:this.state.selectedTheme + 1
        })  
      }
   }
   if(e === 'prev'){
    if(this.state.selectedTheme <= 0){
      console.log('small')
    }
    else{
      this.setState({
        selectedTheme:this.state.selectedTheme - 1
      })  
      this.setDirection(e);
    }
  }
    console.log(selectedIndex, e);
  };

  return (
    <Carousel activeIndex={this.state.index} direction={this.state.direction} 
    onSelect={handleSelect}
    style={{}}
    >
      <Carousel.Item >
      <img
            className="d-block w-100"
            src={require("../../../../../Assets/SliderOne.PNG")}
            alt="First slide"
            style={{width:'90%',height:400,backgroundColor:'black',padding:5}}
            />
      </Carousel.Item>
      <Carousel.Item>
      <img
            className="d-block w-100"
            src={require("../../../../../Assets/SliderFour.PNG")}
            alt="First slide"
            style={{width:'90%',height:400,backgroundColor:'black',padding:5}}
          />
      </Carousel.Item>
    </Carousel>
  );
}


  render(){
  const {classes}=this.props;
  return (
    <div style={{background:this.state.colorback,minHeight:'calc(100vh - 146px)'}}>
<div style={{width:"85%" , height:'40%',marginLeft:'3%'}}>
{this.ControlledCarousel()}
</div>
    <br />
    <div style={{width:'90%',}}>
        <Button type="submit"
    variant="contained" color="primary"  size="large"  style={{float:'left',height:40,width:'10%',borderRadius:20,marginLeft:'3%'}}
    onClick={this.props.back}
    >
        back
      </Button>
       <Button type="submit"
    variant="contained" color="primary"  size="large"  style={{float:'right',height:40,width:'10%',borderRadius:20}}
    onClick={this.handleNext.bind(this)}
    >
        next
      </Button>
    </div>
    </div>
  )
}
}

function mapStateToProp(state) {
  return ({
    
  })
}
function mapDispatchToProp(dispatch) {
  return ({

  })
}

export default connect(mapStateToProp, mapDispatchToProp)(withStyles(styles)(SelectTheme));

