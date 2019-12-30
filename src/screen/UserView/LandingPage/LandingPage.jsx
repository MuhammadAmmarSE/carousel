import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import  firebase from '../../../helper/firebase';
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
    width: 320,
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



class LandingPage extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        mydata:[],
       }
  }



  GetData=()=>{
    const user= this.props.getUser;
    var db = firebase.firestore();
    db.collection('Users').doc(user.uid).collection("Themes").get().then((querySnapshot) => {
      var data=[]
      if(querySnapshot.docs.length>0)
      {
        querySnapshot.forEach((doc) => {
          let newobject={'Name':doc.data().Name,'Thumbnail':doc.data().Thumbnail,'Noc':doc.data().Noc}
          data.push(newobject)
      });
      }
      this.setState({mydata:data})
  });

  }
  componentDidMount(){
  
  }

  componentDidUpdate(prevProps) {
    if (this.props.getUser !== prevProps.getUser && this.props.getUser!==null) {
      this.GetData()
    }
    else{
      console.log('user not found')
    }
  }
  
  CreateCarousel(){
    this.props.history.push('/Manage');
  }

  render() { 
    const { classes } = this.props;
    return ( 
<div className={classes.root}>

<div style={{flexDirection:'row',}}>

{
  this.state.mydata.length ===0 ?
  <div style={{marginTop:'20%',marginLeft:'450px' }}>
   <h3 style={{marginLeft:'60px'}}>No Carousel Yet !</h3>
   <Button variant="contained" onClick={this.CreateCarousel.bind(this)} color="primary">
  Want To create a Carousel
</Button>
      </div>:

<Grid
  container
  direction="row"
>

{this.state.mydata.map((item,i)=>{
 
  return <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.Thumbnail}
          title="Contemplative Reptile"
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.textStyle}>
          {item.Name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.textStyle}>
          Number Of Cards : {item.Noc} 
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
    getUser:state.root.setUser,
  })
}
function mapDispatchToProp(dispatch) {
  return ({
     
  })
}

export default connect(mapStateToProp,mapDispatchToProp)(withStyles(styles)(LandingPage));