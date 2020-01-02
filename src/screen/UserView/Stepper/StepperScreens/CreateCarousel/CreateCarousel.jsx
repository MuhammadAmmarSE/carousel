import React, { Component } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import '../../Stepper.css';

class CreateCarousel extends Component {

  constructor(props){
    super(props)
    this.state = {
      carousalName: "",
        url: "",
        password: ""
    }

}
  handleChange(e){
    this.setState({ [e.target.name]: e.target.value },() =>{
      let data = {
        carousalName: this.state.carousalName,
        url: this.state.url,
    }

    })
}
submit(ev){
  ev.preventDefault()
}
componentWillUnmount(){

}
Next=()=>{
  if(this.state.carousalName !=='' && this.state.url !==''){
    this.props.handleNext(this.state.carousalName,this.state.url);
    this.props.next();
  }
  else{
    alert('Enter Carousel and URL')
  }
}
  render(){
  return (
    <div className="App" style={{height:'calc(100vh - 144px)',background:'#F7F8FC',textAlign:'center',paddingTop:'20px'}}>
<span style={{color:'#3f51b5',fontSize:'20px',textAlign:'center'}}>Lets Start Creating a Carousel</span>
    <form 
     noValidate autoComplete="off" onSubmit={this.submit.bind(this)}>
    <CardContent>
      <TextField
        id="outlined-name"
        label="Carousel Name"
        name="carousalName" onChange={this.handleChange.bind(this)}
        margin="normal"
        variant="outlined"
        style={{width:'40%'}}
      />
       </CardContent>
       <CardContent>
         <TextField
         style={{width:'40%'}}
        id="outlined-name"
        label="Blog URL"
        name="url" onChange={this.handleChange.bind(this)}
        margin="normal"
        variant="outlined"
      />
    
    </CardContent>
       <Button type="submit"
    variant="contained" color="primary"  size="large"  style={{width:'40%',marginTop:20}}

    onClick={this.Next.bind(this)}
    >
      <b>
        next
      </b>
      </Button>
         </form>
     
    </div>
   
  );
}
}



export default CreateCarousel;
