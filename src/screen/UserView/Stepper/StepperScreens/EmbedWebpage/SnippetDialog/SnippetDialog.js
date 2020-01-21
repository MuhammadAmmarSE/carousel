import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {CopyToClipboard} from 'react-copy-to-clipboard';


import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CopyIcon from './paper.png'


import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

import SwipeableViews from 'react-swipeable-views';


import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';





function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose,text, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <CopyToClipboard text={text}
         >
         <IconButton style={{marginRight:'50px',marginTop:'11px'}} aria-label="close" className={classes.closeButton}  >
            <img src={CopyIcon} />
          </IconButton>
        </CopyToClipboard> 
        ) : null}
        {onClose ? (
          <IconButton aria-label="close" style={{marginRight:'5px',marginTop:'10px'}} className={classes.closeButton} onClick={onClose} >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

 
  
  export default function CustomizedDialogs(props) {

    const [value, setValue] = React.useState(0);
    const [text, setText] = React.useState("");

    const handleChange = (event, newValue) => {
      setValue(newValue);
      if(newValue==0)
      {
        setText(props.html)
      }
     else  setText(props.css)
    };

    React.useEffect(() => {
      if(props.html)
      {setText(props.html)}
    },[props.html]);

    
    
  
    return (
        <Dialog  onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
          <DialogTitle id="customized-dialog-title" onClose={props.handleClose} text={text}>
            <AppBar position="static" color="default" style={{width:'80%'}}>
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Html" {...a11yProps(0)} />
                <Tab label="Css" {...a11yProps(1)} />
                
              </Tabs>
            </AppBar>
          </DialogTitle>

          <SwipeableViews
              axis={'x'}
              index={value}
            
          >
            <div style={{minWidth:'520px',minHeight:'500px'}}>
              <DialogContent dividers>
                  <Editor
                  id="code1"
                  value={text}
                  onValueChange={()=>{}}
                  highlight={code => highlight(code, languages.markup)}
                  padding={10}
                  style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                  }}
              />
              </DialogContent>
                {/* <DialogActions>
                  <Button   color="primary">
                    Copy
                  </Button>
                  <Button  onClick={props.handleClose} color="primary">
                    Close
                  </Button>
                </DialogActions>   */}

            </div>

            <div>
              <DialogContent dividers>
                  <Editor
                  value={text}
                  onValueChange={()=>{}}
                  highlight={code => highlight(code, languages.markup)}
                  padding={10}
                  style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                  }}
              />
              </DialogContent>
                {/* <DialogActions>
                  <Button autoFocus  color="primary">
                    Copy
                  </Button>
                  <Button  onClick={props.handleClose} color="primary">
                    Close
                  </Button>
                </DialogActions>   */}

            </div>
          </SwipeableViews>
        </Dialog>
    );
  }