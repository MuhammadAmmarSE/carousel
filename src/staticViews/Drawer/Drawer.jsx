import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Settings from '@material-ui/icons/Settings';
import Person from '@material-ui/icons/Person';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
<<<<<<< HEAD
=======

>>>>>>> 516e2964963f299483665f8cceb151d9f4849ed2

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
const DrawerListIcon=[ <MailIcon color='primary'/> , <MailIcon color='primary'/>, <Person color='primary'/>, <Settings color='primary'/>];


class Drawers extends Component {
  constructor(props){
      super(props);
      this.state={
          open:true,
          visibles:false
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
<<<<<<< HEAD
Create=()=>{
  this.props.histor.push('Stepper')
}
=======
>>>>>>> 516e2964963f299483665f8cceb151d9f4849ed2

render(){
const {classes}=this.props;
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

<<<<<<< HEAD
    <Divider style={{marginTop:20}}/>
<List>            
    <ListItem button 
    //onClick={this.Home.bind(this)} 
    style={{marginTop:45}}>
      <ListItemIcon> <MailIcon color='primary'/></ListItemIcon>
  
      <ListItemText
disableTypography
primary={<Typography type="body2" style={{ fontSize:16,fontWeight:'600',color:'#3f51b5' }}>Home</Typography>}
/>
    </ListItem>
</List>
<Divider style={{marginTop:-5}}/>
<List>            
    <ListItem button  style={{marginTop:5}}>
      <ListItemIcon> <Person /></ListItemIcon>
      <ListItemText
disableTypography
primary={<Typography type="body2" style={{ fontSize:16,fontWeight:'600',color:'gray' }}>Profile</Typography>}
/>
    
    </ListItem>
</List>
<Divider style={{marginTop:-5}}/>
<List>            
    <ListItem button onClick={this.Create.bind(this)} style={{marginTop:5}}>
      <ListItemIcon> <MailIcon /></ListItemIcon>
      <ListItemText
disableTypography
primary={<Typography type="body2" style={{ fontSize:16,fontWeight:'600',color:'gray' }}>Manage</Typography>}
/>
    </ListItem>
</List>
<Divider style={{marginTop:-5}}/>
<List>            
    <ListItem button 
   // onClick={this.Setting.bind(this)}
     style={{marginTop:5}}>
      <ListItemIcon> <Settings /></ListItemIcon>
      <ListItemText
disableTypography
primary={<Typography type="body2" style={{ fontSize:16,fontWeight:'600',color:'gray' }}>Setting</Typography>}
/>
    </ListItem>
=======
    <Divider style={{marginTop:'64px'}}/>

    { DrawerList.map((item,index)=>

<List key={index}>            
<ListItem button 
//onClick={this.Home.bind(this)} 
>
<ListItemIcon>{DrawerListIcon[index]}</ListItemIcon>


  <ListItemText
  disableTypography
    primary={<Typography type="body2" style={{ fontSize:16,fontWeight:'600',color:'#3f51b5' }}>{DrawerList[index]}</Typography>}
  />
</ListItem>
>>>>>>> 516e2964963f299483665f8cceb151d9f4849ed2
</List>
  )}


</Drawer>

</div>

);
    }
}

function mapStateToProp(state) {
  return ({
<<<<<<< HEAD
    histor:state.root.getHis,
  })
}
function mapDispatchToProp(dispatch) {
  return ({

  })
}

export default connect(mapStateToProp, mapDispatchToProp)(withStyles(styles)(Drawers));
=======
    getHis:state.root.getHis,
  })
}

export default connect(mapStateToProp)(withStyles(styles)(Drawers));
>>>>>>> 516e2964963f299483665f8cceb151d9f4849ed2
