import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Input } from 'react-spreadsheet-grid'

const styles = theme=> ({

});

const data = [

[   { id: '1', name: '', ExtractedData: 'Extracted Data 1'},
    { id: '2', name: '', ExtractedData: 'Extracted Data 2'},
    { id: '3', name: '', ExtractedData: 'Extracted Data 3'},
],
[   { id: '1', name: '', ExtractedData: 'Extracted Data 1'},
    { id: '2', name: '', ExtractedData: 'Extracted Data 2'},
    { id: '3', name: '', ExtractedData: 'Extracted Data 3'},
],
[   { id: '1', name: '', ExtractedData: 'Extracted Data 1'},
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

onFieldChange(rowId, field, value) {
  
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
      row[i].name=this.state.rows[i].name;
    }
  })
  this.props.handleNext(data);
  this.props.next()
};
initColumns() {
  return [
    {
      title: () => 'Name', 
      value: (row, { focus }) => {
          return (
              <Input  
placeholder={'Heading '+ row.id}
                value={row.name}
                focus={focus}
                style={{fontWeight:'bold'}}
                onChange={this.onFieldChange.bind( this,row.id, 'name')}
              />
          );
      }
    }, {
      id: 'ExtractedData',
      title: () => 'Extracted Data',
      value: (row, { focus } ) => {
          return (
              <Input  
                value={row.ExtractedData}
                isOpen={focus}
                style={{color:'gray'}}
                onChange={this.onFieldChange.bind( this,row.id, 'ExtractedData')}

              />
          );
      }
    }
  ]
}

  render(){
  return (
   
    <div style={{background:'#F7F8FC',width:'100%',height:'calc(100vh - 144px)'}}>

<div style={{width:'90%',marginLeft:'5%',height:'100%'}} >


<div style={{height:'90%',paddingTop:'10px'}}>
  <div style={{height:"50%"}}>
  <span style={{marginLeft:0,color:'#3f51b5',fontSize:14,fontWeight:'bold'}}>Select and Unselect data for your Blog</span>
          <iframe title="Website" className='iframes' height='80%' width="100%" src=''></iframe>
  </div>
<div style={{height:'50%',width:'100%',position:'relative'}}>
<div  style={{width:'100%'}}>
        <span style={{marginLeft:0,color:'#3f51b5',fontSize:14,fontWeight:'bold'}}>Selected Data for your Blog</span>

<Grid 
                columns={this.state.columns}
                rows={this.state.rows}
                getRowKey={row => row.id}
                blurCurrentFocus={this.state.blurCurrentFocus}
                />
</div>
</div>
    <br /> 
    </div> 


    
    <div style={{width:'100%',height:'10%',background:'',paddingTop:'5px'}}>

        <Button type="submit"
    variant="contained" color="primary"  size="large"  style={{float:'left',width:'10%',height:40,borderRadius:20,marginLeft:0,marginBottom:0}}
    
    onClick={this.props.back}
    >
        back
      </Button>
       <Button type="submit"
    variant="contained" color="primary"  size="large"  style={{float:'right',height:40,width:'10%',borderRadius:20}}
    
    onClick={this.handleNext.bind(this)}
    >
        next
      </Button>
    </div>

    </div>

    </div>
  )
}
}



export default withStyles(styles)(SelectData);

