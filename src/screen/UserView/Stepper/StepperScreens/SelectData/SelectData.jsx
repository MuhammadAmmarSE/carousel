import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Input, Select } from 'react-spreadsheet-grid'

const styles = theme=> ({

});

const data= [ 
  [
    { id: '1', name: '', ExtractedData: 'Extracted Data 1'},
    { id: '2', name: '', ExtractedData: 'Extracted Data 2'},
    { id: '3', name: '', ExtractedData: 'Extracted Data 3'},
  ],
  [
    { id: '1', name: '', ExtractedData: 'Extracted Data 1'},
    { id: '2', name: '', ExtractedData: 'Extracted Data 2'},
    { id: '3', name: '', ExtractedData: 'Extracted Data 3'},
  ],
  [
    { id: '1', name: '', ExtractedData: 'Extracted Data 1'},
    { id: '2', name: '', ExtractedData: 'Extracted Data 2'},
    { id: '3', name: '', ExtractedData: 'Extracted Data 3'},
  ],
]

const rows=data[0];



class SelectData extends Component {

  constructor(props){
    super(props)
    this.state = {
        userName: "",
        url: "",
        password: "",
        rows,
        columns: this.initColumns()
    }

}

onFieldChange(rowId,field,value) {

console.log(rowId,field,value)
  const row = rows.find(({ id }) => id === rowId);
   row[field] = value;
  this.setState({
      rows: [].concat(rows),
      blurCurrentFocus: true
  });
}


handleNext = () => {

  data.map((row,index)=>{

   for(let i=0;i<row.length;i++)
   {
     row[i].name=this.state.rows[i].name
   }
  })
  this.props.handleNext(data);
  this.props.next();
};
initColumns() {
  return [
    { id: 'name',
      title: () => 'name', 
      value: (rows, { focus }) => {
          return (
              <Input  
                placeholder={'Heading '+rows.id}
                value={rows.name}
                focus={focus}
                style={{fontWeight:'bold'}}
                onChange={this.onFieldChange.bind(this,rows.id,'name') }
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
                onChange={this.onFieldChange.bind(this,rows.id,'ExtractedData')}

              />
          );
      }
    }
  ]
}

  render(){
  return (
   
    <div style={{width:'90%',marginLeft:'5%',minHeight:'calc(100vh - 146px)'}}>
<div style={{maxHeight:'72%'}}>
<h4 style={{marginLeft:0,color:'#3f51b5',fontSize:14,fontWeight:'bold'}}>Select and Unselect data for your Blog</h4>
        <iframe class='iframes' style={{marginLeft:0}} height="45%" width="95%" src=''></iframe>
        <h4 style={{marginLeft:0,color:'#3f51b5',fontSize:14,fontWeight:'bold'}}>Selected Data for your Blog</h4>
<div style={{height:'40%',width:'95%',marginTop:0}}>
  
<Grid 
                columns={this.state.columns}
                rows={this.state.rows}
                getRowKey={row => row.id}
                blurCurrentFocus={this.state.blurCurrentFocus}
                />

</div>
    <br />
    </div>
    <div style={{width:'95%',marginTop:'0px'}}>

        <Button type="submit"
    variant="contained" color="primary"  size="large"  style={{float:'left',width:'10%',height:40,borderRadius:20,marginLeft:0,marginTop:20,marginBottom:0}}
    
    onClick={this.props.back}
    >
        back
      </Button>
       <Button type="submit"
    variant="contained" color="primary"  size="large"  style={{float:'right',height:40,width:'10%',borderRadius:20,marginTop:20}}
    
    onClick={this.handleNext.bind(this)}
    >
        next
      </Button>
    </div>
    </div>
  )
}
}


export default withStyles(styles)(SelectData);

