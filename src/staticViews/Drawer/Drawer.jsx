import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import HomeIcon from '@material-ui/icons/Home';
import Settings from '@material-ui/icons/Settings';
import Person from '@material-ui/icons/Person';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

const drawerWidth = 240;
const styles = theme=> ({
  root: {
    display: 'flex',
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
});

const DrawerList=['Home' , 'Carousel', 'Profile', 'Settings'];
const DrawerListIcon=[ <HomeIcon color='#b4b3b3'/>,<ViewCarouselIcon color='#b4b3b3'/>, <Person color='#b4b3b3'/>, <Settings color='#b4b3b3'/>];
const DrawerListIconActive=[ <HomeIcon color='primary'/> , <ViewCarouselIcon color='primary'/>, <Person color='primary'/>, <Settings color='primary'/> ];


class Drawers extends Component {
  constructor(props){
      super(props);
      this.state={
          open:true,
          active:null,
      }
      this.handleDrawerOpen=this.handleDrawerOpen.bind(this);
      this.handleDrawerClose=this.handleDrawerClose.bind(this);
  }

  handleDrawerOpen()
{
    this.setState({open:true})
}
handleDrawerClose()
{
    this.setState({open:false})
}

render(){
const {classes}=this.props;
const path=this.props.getHis.location.pathname;
  return (
    <div >
      <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={this.state.open}
      classes={{
        paper: classes.drawerPaper,
      }}
      >

    <Divider style={{marginTop:'64px'}}/>

    { DrawerList.map((item,index)=>

      <List key={index} onClick={()=>{this.props.getHis.push('/User/'+item); this.setState({active:item}) } }>            
      <ListItem button 
      //onClick={this.Home.bind(this)} 
      >
<ListItemIcon>{path==="/User/"+item?DrawerListIconActive[index]:DrawerListIcon[index]}</ListItemIcon>


  <ListItemText
  disableTypography
    primary={<Typography type="body2" style={{ fontSize:16,fontWeight:'600',color:path==="/User/"+item?'#3F51B5':'#b4b3b3' }}>{item}</Typography>}
  />
</ListItem>
</List>
  )}


</Drawer>

</div>

);
    }
}

function mapStateToProp(state) {
  return ({
    getHis:state.root.getHis,
  })
}

export default connect(mapStateToProp)(withStyles(styles)(Drawers));
