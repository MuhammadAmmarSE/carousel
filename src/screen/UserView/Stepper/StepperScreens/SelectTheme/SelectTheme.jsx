import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';

  const styles = theme => ({
   
  });


class SelectTheme extends Component {

  constructor(props){
    super(props)
    this.state = {
        activeStep:0,
         selectedTheme:1,
         index:0,
         direction:'',
    }

}
 handleNext = () => {
  this.props.handleNext(this.state.selectedTheme);
  console.log(this.state.selectedTheme,'this.state.selectedTheme');
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
     
    }
    else{
      this.setState({
        selectedTheme:this.state.selectedTheme - 1
      })  
      this.setDirection(e);
    }
  }
    
  };

  return (
    <Carousel activeIndex={this.state.index} direction={this.state.direction} 
    onSelect={handleSelect}
    style={{background:'#000000'}}
    >
      <Carousel.Item style={{background:'#000000'}}>
      <img
            className="d-block w-100"
            src={require("../../../../../Assets/SliderOne.PNG")}
            alt="First slide"
            style={{width:'100%',height:400,}}
            />
      </Carousel.Item>
      <Carousel.Item>
      <img
            className="d-block w-100"
            src={require("../../../../../Assets/SliderFour.PNG")}
            alt="First slide"
            style={{width:'100%',height:400}}
          />
      </Carousel.Item>
    </Carousel>
  );
}


  render(){
   
  return (
    <div style={{background:'#F7F8FC',width:'100%',height:'calc(100vh - 144px)'}}>

      <div style={{width:'90%',marginLeft:'5%',height:'100%'}}>

<div style={{width:"100%" , height:'90%'}}>
{this.ControlledCarousel()}
</div>


    <div style={{width:'100%',height:'10%',background:'',paddingTop:'5px'}}>
        <Button type="submit"
    variant="contained" color="primary"  size="large"  style={{float:'left',height:40,width:'10%',borderRadius:20}}
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
    </div>
  )
}
}



export default withStyles(styles)(SelectTheme);

