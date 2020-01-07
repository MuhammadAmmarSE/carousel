import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Grid, Input,Select } from 'react-spreadsheet-grid'
import { withStyles } from '@material-ui/core/styles';
import firebase from '../../../../../helper/firebase'
import '../../Stepper.css';
import MenuItem from '@material-ui/core/MenuItem';
import Selects from '@material-ui/core/Select';


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
        columns: this.initColumns(),
        list:[],
        docs:null,
        CNo:null,
        NocFire:5,
        Placement:[],
        }
        this.filterobj=this.filterobj.bind(this);
    }
    



    componentDidMount(){     
      var global = this
      var db = firebase.firestore();
      db.collection('ThemeSetting').doc('Theme'+this.props.ThemeBluePrint).get()
      .then(function(doc){
        if(doc.exists){
          global.setState({
              docs:doc.data(),
              NocFire:doc.data().Noc,
            })
          console.log('exists',doc.data())
        }
        else{
          console.log('invalid theme')
        }
      })
       console.log(this.props.ThemeBluePrint,'ThemeBluePrint')
    }




onFieldChange(rowId, field, value) {
  console.log(rowId, field, value);
  const data={};
  data[value]=field;
  this.state.Placement.push(data);
  console.log(data,'data',)
}

filterobj = (obj) =>{
  var options = {description:'true',type:'true',xyz:'false'}
  var res = []
  Object.keys(options).map((key) => {
    if(options[key]==='true')
    {
   res.push(key);
    }
  } 

  )
  return res;
}

initColumns() {
  const filter = this.filterobj();
  return [
    {
      title: () => 'Name', 
      value: (row, { focus }) => {
          return (
              <Input  
                placeholder='Enter Name'
                value={row.name}
                focus={focus}
                style={{fontWeight:'bold'}}
              />
          );
      }
    }, {
      id: 'ExtractedData',
      title: () => 'Extracted Data',
      value: (rows, { focus }) => {
          return (
              <Input  
                value={rows.ExtractedData}
                isOpen={focus}
                style={{color:'gray'}}

              />
          );
      }
    },
    {
      id: 'SelectData',
      title: () => 'Placed Data',
      value: (rows, { focus }) => {
          return (
              <Select  
              items={  filter.map((lis,i)=>{
                return lis }) }
              // items={
              //   filter
              // }
              selectedId={rows.selectData}
                isOpen={focus}
                style={{color:'gray'}}
             
                 onChange={this.onFieldChange.bind( this,rows.id,filter[rows.id-1],rows.name)}

              />
          );
      }
    }
  ]
}



// /////

Next=()=>{
  this.props.next()
}

GetOptions(Noc)
{

  let items=[];
  for (let i=0;i<Noc;i++)
  {
  items.push( <MenuItem value={i+1}>{i+1}</MenuItem>)
  };
  return items;
}

handleChange (event) {
  this.setState({
    CNo: event.target.value
  });
};



    render() { 
     
        const {classes}=this.props;
        return ( 
        <div style={{width:'90%',marginLeft:'5%',background:'',height:'calc(100vh - 144px)'}}>

<div style={{height:'45%',paddingTop:'10px'}}>
  <span style={{marginLeft:0,color:'#3f51b5',fontSize:14,fontWeight:'bold'}}>Select Card</span>
<div >

     <Selects
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          MenuProps={MenuProps}
          value={this.state.CNo}
         onChange={this.handleChange.bind(this)}
         style={{width:'40%'}}
         class="form-control" id="exampleFormControlSelect1"
        >
           {this.GetOptions(this.state.NocFire)}
        </Selects>


    </div>

</div>


<div style={{height:'45%',width:'100%',marginTop:0}}>

<div  style={{width:'100%'}}>

<Grid 
  columns={this.state.columns}
  rows={this.state.row}
  getRowKey={row => row.id}
  blurCurrentFocus={this.state.blurCurrentFocus}
  />
 
  </div>

</div>
   
          <div style={{background:'',height:'10%',width:'100%',paddingTop:'5px'}}>

<Button type="submit"
variant="contained" color="primary"  size="large"  style={{float:'left',height:40,width:'10%',borderRadius:20,marginTop:0}}
onClick={this.props.back}
>
back
</Button>
<Button type="submit"
variant="contained" color="primary"  size="large"  style={{float:'right',height:40,width:'10%',borderRadius:20,marginTop:0}}
onClick={this.Next.bind(this)}
>
next
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
  
