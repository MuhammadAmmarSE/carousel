import React, { Component } from 'react';
import Carousel from '../../Carousel/Carousel'
class LandingPage extends Component {
  constructor(props) {
      super(props);
      this.state = { 
       }
  }



  GetData=()=>{

    var carousel = {
      name :'Carousel Three',
      title :'Title Three',
      description:'Description Three'
  }
  
    firebase.database().ref('Usercarousel/').once('value',(snap)=>{
      console.log('action data',snap.val());
      var data=[]
      let fbData=snap.val()
      for (var key in fbData)
      {
        console.log("data===========>",fbData[key])
      data.push(fbData[key])
      }
  
      this.setState({mydata:data})  
  
    })
  }
  componentDidMount(){
    this.GetData()
    console.log('asdasd')
  }
  
  CreateCarousel(){
    this.props.history.push('/Manage');
  }






  render() { 
    const { classes } = this.props;
    return ( 
{/* <div>
 <Carousel />
</div> */}
<div className={classes.root}>

<div style={{flexDirection:'row',}}>

{
  this.state.mydata.length ===0 ?
  <div style={{marginTop:'20%',marginLeft:'0%' }}>
   <h3>No Carousel Yet !</h3>
   <Button variant="contained" onClick={this.CreateCarousel.bind(this)} color="primary">
  Want To create a Carousel
</Button>
      </div>:

<Grid
  container
  direction="row"
  // justify="center"
  // alignItems="center"
>

{this.state.mydata.map((item,i)=>{
 
  return <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://wowslider.com/sliders/demo-93/data1/images/sunset.jpg"
          title="Contemplative Reptile"
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.textStyle}>
          {item.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.textStyle}>
          {item.title} sdsads asdas asdasd asdasd asd asdas
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
      })} 
 </Grid>

}
    
    </div>
     
    </div>
  );
}
}

export default LandingPage;