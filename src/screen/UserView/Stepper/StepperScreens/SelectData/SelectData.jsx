import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Input, Select } from 'react-spreadsheet-grid'

const styles = theme=> ({

});

const rows=[
  { id: '1', name: 'Blog Title', ExtractedData: 'ExtractedData',selectData:null,names:''},
  { id: '2', name: 'Blog Heading', ExtractedData: 'sadsd',selectData:null ,names:''},
  { id: '3', name: 'Blog Description', ExtractedData: 'asdasd',selectData:null,names:'' },
];

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
  this.props.next()
};
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
                onChange={this.onFieldChange.bind( this,rows.id, 'ExtractedData')}

              />
          );
      }
    }
  ]
}

  render(){
  return (
   
    <div style={{width:'90%',marginLeft:'5%'}}>

<h4 style={{marginLeft:'5%',color:'#3f51b5'}}>Select and Unselect data for your Blog</h4>
        <iframe class='iframes' style={{marginLeft:'3%'}} height="300px" width="95%" src={this.props.url}></iframe>
        <h4 style={{marginLeft:'5%',color:'#3f51b5'}}>Selected Data for your Blog</h4>

<Grid 
                columns={this.state.columns}
                rows={this.state.rows}
                getRowKey={row => row.id}
                blurCurrentFocus={this.state.blurCurrentFocus}
            />

    <br />
    <div >

        <Button type="submit"
    variant="contained" color="primary"  size="large"  style={{float:'left',width:'10%',height:40,borderRadius:20,marginLeft:'2%',marginTop:20,marginBottom:20}}
    
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

function mapStateToProp(state) {
  return ({
  
  })
}
function mapDispatchToProp(dispatch) {
  return ({

  })
}

export default connect(mapStateToProp, mapDispatchToProp)(withStyles(styles)(SelectData));
