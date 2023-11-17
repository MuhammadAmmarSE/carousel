import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import firebase from '../../../helper/firebase';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "./LandingPage.css"

import Noimage from '../../../Assets/no-image.png';

const styles = theme => ({
  root: {
    marginLeft:'240px',
    width:'calc(100vw - 260px)'
  },
  card: {
    width: 320,
    marginTop: 50,
    marginLeft:'10px'
  },
  media: {
    height: 140
  },
  textStyle: {
    textAlign: 'left'
  }
});

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mydata: [],
      Response: false
    }
  }

  GetData = () => {
    this.setState({Response: false, mydata: []});
    const user = this.props.getUser;
    var db = firebase.firestore();
    db
      .collection('Users')
      .doc(user.uid)
      .collection("Themes")
      .get()
      .then((querySnapshot) => {
        
        if (querySnapshot.docs.length > 0) {
          
          
          querySnapshot.forEach((doc) => {
               let image=null;
               let url=null;
               let ref="Theme"+doc.data().ThemeBluePrint+"Thumbnails";

               
           
              const images = firebase.storage().ref().child(ref);
              image = images.child(doc.data().Thumbnail);
              image.getDownloadURL().then(onResolve, onReject)
              let global=this;

              function onResolve(foundURL) {
                let newobject = {
                  'Name': doc
                    .data()
                    .Name,
                  'Thumbnail':  foundURL,
                  'Noc': doc
                    .data()
                    .Noc
                }
                let data=global.state.mydata;
                data.push(newobject)
                global.setState({mydata: data, Response: true})



              
            }
            
            function onReject(error) {
              let newobject = {
                'Name': doc
                  .data()
                  .Name,
                'Thumbnail':  Noimage,
                'Noc': doc
                  .data()
                  .Noc
              }
              let data=global.state.mydata;
              data.push(newobject)
              global.setState({mydata: data, Response: true})



            
            }




              // (url) => { 
              //   let newobject = {
              //     'Name': doc
              //       .data()
              //       .Name,
              //     'Thumbnail':  url,
              //     'Noc': doc
              //       .data()
              //       .Noc
              //   }
              //   let data=this.state.mydata;
              //   data.push(newobject)
              //   this.setState({mydata: data, Response: true})



              // }
              
            
           
          });
        }
        else this.setState({Response: true})
      });

  }
  CreateCarousel() {
    this
      .props
      .history
      .push('./Carousel');
  }
  componentDidMount() {
    if (this.props.getUser) {
      this.GetData()
    }

  }
  

  componentDidUpdate(prevProps) {
    if (this.props.getUser !== prevProps.getUser && this.props.getUser !== null) {
      this.GetData()
    } else {
      
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>

        {this.state.Response===true?
          this.state.mydata.length === 0?   
            <div className="LandingPageMainDiv">
              <h3>No Carousel Yet !</h3>
                  <Button
                    variant="contained"
                    onClick={this
                    .CreateCarousel
                    .bind(this)}
                    color="primary">
                    Want To create a Carousel
                  </Button>
              </div>
              :
              
              <Grid container direction="row">

                {this
                  .state
                  .mydata
                  .map((item, i) => {

                    return <Card key={i} className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={item.Thumbnail}
                          title="Contemplative Reptile"/>
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className={classes.textStyle}>
                            {item.Name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.textStyle}>
                            Number Of Cards : {item.Noc}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          View
                        </Button>
                        <Button size="small" color="primary">
                          Edit Theme
                        </Button>
                      </CardActions>
                    </Card>
                  })}
              </Grid>
             
          :
          
          <div style={{background:'',position: 'fixed',top: '50%',left: '50%', transform: 'translate(-50%, -50%)'}}>
          <Loader
          type="RevolvingDot"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
          />
         
        </div>
  }

      </div>
    );
  }
}

function mapStateToProp(state) {
  return ({getUser: state.root.setUser})
}
function mapDispatchToProp(dispatch) {
  return ({})
}

export default connect(mapStateToProp, mapDispatchToProp)(withStyles(styles)(LandingPage));