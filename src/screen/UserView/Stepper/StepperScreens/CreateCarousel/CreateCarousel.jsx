import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

const useStyles =makeStyles(theme => ({
  
}));
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
  if(this.state.carousalName !='' && this.state.url !=''){
    this.props.next();
  }
  else{
    alert('Enter Carousel and URL')
  }
}
  render(){
   console.log(this.props.email,'props')
  return (
    <div className="App" style={{marginLeft:'350px'}}>
<h2 style={{color:'#3f51b5'}}><b>Lets Start Creating a Carousel</b></h2>
    <form 
     noValidate autoComplete="off" onSubmit={this.submit.bind(this)}>
    <CardContent>
      <TextField
        id="outlined-name"
        label="Carousel Name"
        name="carousalName" onChange={this.handleChange.bind(this)}
        margin="normal"
        variant="outlined"
        style={{width:'40%',marginLeft:'30px'}}
      />
       </CardContent>
       <CardContent>
         <TextField
         style={{width:'40%',marginLeft:'30px'}}
        id="outlined-name"
        label="Blog URL"
        name="url" onChange={this.handleChange.bind(this)}
        margin="normal"
        variant="outlined"
      />
    </CardContent>
       <Button type="submit"
    variant="contained" color="primary"  size="large"  style={{width:'40%',marginTop:20,marginLeft:'40px'}}

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

function mapStateToProp(state) {
  return ({
  })
}
function mapDispatchToProp(dispatch) {
  return ({
    
  })
}

export default connect(mapStateToProp, mapDispatchToProp)(CreateCarousel);
