import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Grid, Input, Select } from 'react-spreadsheet-grid'
import { withStyles } from '@material-ui/core/styles';
import firebase from '../../../../../helper/firebase'
import '../../Stepper.css';

import MenuItem from '@material-ui/core/MenuItem';
import Selects from '@material-ui/core/Select';
// import Select from '@material-ui/core/Select';




import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


const styles=(theme => ({

}));

// Placement:{}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class ThemeConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        selectedTheme:1,
        row:this.props.data[0],
        open:false,
         columns: this.initColumns(),
        list:[],
        options:[],
        CNo:1,
        NocFire:null,
        Placement:[],
        anchorEl:null,
        
        }
        this.getOpen=this.getOpen.bind(this);
        this.onFieldChange=this.onFieldChange.bind(this);
        
    }

     handlePopoverOpen = event => {
       console.log(event)
     this.setState({open:true,anchorEl:event.currentTarget})
    };
  
     handlePopoverClose = () => {
     this.setState({open:false,anchorEl:null})
    };
    


    componentDidMount(){     
      var global = this
      var db = firebase.firestore();
      db.collection('ThemeSetting').doc('Theme'+this.props.ThemeBluePrint).get()
      .then(function(doc){

        if(doc.exists){
          let options=[];
          let optionId=1;
          for (let key in doc.data()){

            if(doc.data().hasOwnProperty(key)&&key!=='Noc'){
              options.push({id:optionId, name:key})
              optionId++
            }
         }

          let placement=[];
         global.state.row.map( (row,index)=>
         {
           placement.push({id:row.id,name:row.name,placementName:null,placementId:null})
         })

         console.log(placement)
         console.log(options)

          // for(i=0;i<doc.data().length;i++)
          // {
          //   let obj={id:i,name:doc.data().name}


          // }
          let Noc=global.props.data.length;
          if(Noc > doc.data().Noc)
          {
            Noc=doc.data().Noc
          }

          global.setState({
             options,
              Placement:placement,
              NocFire:Noc,
            })
          
        }
        else{
          console.log('Invalid theme')
         }
      })
      
    }

     getOpen ()
    {
     return this.state.open;
    }




onFieldChange(rowId,field,optionId) {

  
  let newplacement=this.state.Placement;
  let options=this.state.options;

 
  let indexP=newplacement.findIndex(x => x.id === rowId)
  let indexO=options.findIndex(x => x.id === optionId)

  console.log(indexP,indexO)

  // if(newplacement[indexP].placementName!=null)
  // {
  //   options.push({id:newplacement[indexP].placementId,name:newplacement[indexP].placementName})
  //   console.log('not null')
  // }

  newplacement[indexP].placementName=options[indexO].name;
  newplacement[indexP].placementId=options[indexO].id;

  // options.splice( options[indexO], 1 );

  console.log(newplacement)

  this.setState({Placement:newplacement})



}

onFocus() {
  alert('aaa')
}



initColumns= () => {
  
  return [
    { 
      title: () => 'Name', 
      value: (row, { focus }) => {
          return (
            <span style={{fontWeight:'bold'}}>
              {row.name}
            </span>
             
          );
      }
    }, {
      id: 'ExtractedData',
      title: () => 'Extracted Data',
      value: (rows, { focus }) => {
          return (
            <span style={{fontWeight:'bold'}}>
            {rows.ExtractedData}
            </span>
          );
      }
    },
    { 
      id: 'SelectData',
      title: () => 'Placed Data',
      value: ( rows, { focus } ) => {
          return (

          
            <Select
            
            style={{ width: '10%' ,position:'absolute',overflow:'scroll'}}
           
            isOpen={focus}
            
            items={this.state.options}
            selectedId={this.state.Placement.find(x=>x.id===rows.id).placementId}
            
            onChange={this.onFieldChange.bind(this, rows.id, 'positionId')} />
            
          );
      }
    }
  ]
}





Next=(e)=>
{
  e.preventDefault();
  this.props.handleNext(this.state.Placement,this.state.CNo);
  this.props.next();
}

GetOptions(Noc)
{

  let items=[];
  for (let i=0;i<Noc;i++)
  {
  items.push( <MenuItem key={i+1}  value={i+1}>{i+1}</MenuItem>)
  };
  return items;
}

handleChange (event) {
  this.setState({
    CNo: event.target.value
  });
};



    render() { 
     
        return ( 
        <div style={{width:'90%',marginLeft:'5%',background:'',height:'calc(100vh - 144px)'}}>

<div style={{height:'45%',paddingTop:'10px'}}>
  <span style={{marginLeft:0,color:'#3f51b5',fontSize:14,fontWeight:'bold'}}>Select Card</span>
<div >

     <Selects
         
          MenuProps={MenuProps}
          value={this.state.CNo}
         onChange={this.handleChange.bind(this)}
         style={{width:'40%'}}
         className="form-control" id="exampleFormControlSelect1"
        >
           {this.GetOptions(this.state.NocFire)}
        </Selects>


    </div>

</div>


<div style={{height:'45%',width:'100%',marginTop:0}}>

{ this.state.Placement.length>0?
<div  style={{width:'100%'}}>

<Grid 
  columns={this.state.columns}
  rows={this.state.row}
  getRowKey={row => row.id}
  blurCurrentFocus={this.state.blurCurrentFocus}
  />
 
  </div>:

<div style={{background:'',position: 'fixed',top: '50%',left: '50%', transform: 'translate(-50%, -50%)'}}>
<Loader
type="RevolvingDot"
color="#00BFFF"
height={100}
width={100}
timeout={3000} //3 secs
/>

</div>}

</div>

    
   
          <div style={{background:'',height:'10%',width:'100%',paddingTop:'5px'}}>

<Button type="submit"
variant="contained" color="primary"  size="large"  style={{float:'left',height:40,width:'10%',borderRadius:20,marginTop:0}}
onClick={this.props.back}
>
back
</Button>



<Button type="submit"
variant="contained" color="primary"  size="large"  style={{float:'right',height:40,width:'25%',borderRadius:20,marginTop:0}}
onClick={this.Next.bind(this)}
>
Create Carousel
</Button>

<Button 
variant="contained" color="primary"  size="large"  style={{float:'right',marginRight:'10px',height:40,width:'10%',borderRadius:20,marginTop:0}}
>
Preview
</Button>
</div>
        
        </div>
        
        );

    }
}
 
function mapStateToProp(state) {
    return ({
        SelectedTheme: state.root.SelectedTheme,
      carousalName: state.root.carousalName,
      url:state.root.url,
      SelectedData:state.root.SelectedData
    })
  }
  function mapDispatchToProp(dispatch) {
    return ({
  
    })
  }
  
  export default connect(mapStateToProp, mapDispatchToProp)(withStyles(styles)(ThemeConfig));
  
