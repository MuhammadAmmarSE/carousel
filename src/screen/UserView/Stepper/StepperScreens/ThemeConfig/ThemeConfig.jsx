import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Grid, Input,Select } from 'react-spreadsheet-grid'
import { withStyles } from '@material-ui/core/styles';
import firebase from '../../../../../helper/firebase'

const styles=(theme => ({

}));

// Placement:{}



class ThemeConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        selectedTheme:1,
        row:this.props.data[0],
        columns: this.initColumns(),
        list:[],
        docs:null
        }
    
    }
    



    componentDidMount(){     
      var global = this
      var db = firebase.firestore();
      db.collection('ThemeSetting').doc('Theme'+this.props.ThemeBluePrint).get()
      .then(function(doc){
        if(doc.exists){
          global.setState({
              docs:doc.data()
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
  const newRow = this.state.row.find(({ id }) => id === rowId);
  newRow[field] = value;
  this.setState({
      row: [].concat(newRow),
      blurCurrentFocus: true
  });
}



initColumns() {
  
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
              items={   this.state.list.filter((lis,i)=>{
                return lis.value>0}) }
              selectedId={rows.selectData}
                isOpen={focus}
                style={{color:'gray'}}
             
               //  onChange={this.onFieldChanges.bind( this,rows.id,this.state.list[rows.id-1])}

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



    render() { 
      console.log(this.state.docs,'docs')
        const {classes}=this.props;
        return ( 
        <div style={{width:'90%',marginLeft:'5%',background:'',height:'calc(100vh - 144px)'}}>

<div style={{height:'45%',paddingTop:'10px'}}>
{this.state.docs!=null && Object.keys(this.state.docs).map(function(d, index){
    return (
      <div >
      <span style={{marginLeft:0,color:'#3f51b5',fontSize:14,fontWeight:'bold'}}>Select Cards</span>
      <select style={{marginLeft:0,width:'40%',height:40}} class="form-control" id="exampleFormControlSelect1" 
      // onChange={(e)=>{this.handle(e,d.Name,index)}}
      >
                  <option>Yes</option> 
                  <option>No</option>                     
            </select>
      </div>
    )
  },this)}
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
  
