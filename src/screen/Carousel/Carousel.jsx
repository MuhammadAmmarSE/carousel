import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Settings from '@material-ui/icons/Settings';
import Person from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import  firebase from '../../helper/firebase';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


const drawerWidth = 240;

const styles = theme=> ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  card: {
    maxWidth: 320,
    marginTop:100,
    marginLeft:'250px',marginRight:'-200px',
  },
  media: {
    height: 140,
  },
  textStyle:{
    textAlign:'left'
    }
});



let carouselData = []
 class Carousel extends Component {
constructor(props){
    super(props);
    this.state={
        mydata:[]
    }

}




GetData=()=>{

  var carousel = 
  {
    name :'Carousel Three',
    title :'Title Three',
    description:'Description Three'
  }

  // var key = firebase.database().ref('Usercarousel/').push(carousel).key;
  // console.log("message=========>", key);

  firebase.dataase().ref('Usercarousel/').once('value',(snap)=>{
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
}

CreateCarousel(){
  this.props.history.push('/Manage');
}

  render(){
    console.log("state========>",this.state.mydata)
const {classes}=this.props;
  return (
    <div className={classes.root}>
      <div style={{flexDirection:'row',}}>
        {
          this.state.mydata.length ===0 ?
          <div style={{marginTop:'20%',marginLeft:'0%' }}>
            <h3>No Carousel Yet !</h3>
            <Button variant="contained" onClick={this.CreateCarousel.bind(this)} color="primary">
            Want To create a Carousel
            </Button>
          </div>
          :
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

function mapStateToProp(state) {
  return ({
   
  })
}
function mapDispatchToProp(dispatch) {
  return ({
     
  })
}

export default connect(mapStateToProp,mapDispatchToProp)(withStyles(styles)(Carousel));