import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Grid, Input,Select } from 'react-spreadsheet-grid'
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


const styles=(theme => ({

}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const rowss=[
     [ {Name :'Select Card',state:'Select_Card',values :[] },{Name:'Select Title',state:'Select_Header',values :['No','Yes']},  {Name:'Select Description',state:'Select_Footer',values :['No','Yes']} ],
     [ {Name :'Select Card',state:'Select_Card',values :[] }, {Name:'Select Description',state:'Select_Footer',values :['No','Yes']} ],
     [ {Name :'Select Card',state:'Select_Card',values :[] }, {Name:'Select Header',state:'Select_Header',values :['No','Yes']},  {Name:'Select Footer',state:'Select_Footer',values :['No','Yes']} ],
  ];

  const rows=[
    { id: '1', name: 'Blog Title', ExtractedData: 'ExtractedData',selectData:null,names:''},
    { id: '2', name: 'Blog Heading', ExtractedData: 'sadsd',selectData:null ,names:''},
    { id: '3', name: 'Blog Description', ExtractedData: 'asdasd',selectData:null,names:'' },
  ];
let arrVal = [
]
let arr = [];
let valarr = [];
let cardArr = [];

class ThemeConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        value:[],
        newvalue:'',
        selectedTheme:1,
        rows,
        columns: this.initColumns(),
        age:'',
        list:[],
        modalStyle:getModalStyle,
        open:false
        }
    
    }
    

handle(e,name,index)
    {
var name = name
let newlist=this.state.list;
if(e.target.value === 'No'){
  newlist[index].value=0;
}
else if (e.target.value === 'Yes'){
  newlist[index].value=1;
}
else{
  newlist[index].value=e.target.value;
}
        var value=e.target.value
        this.setState({
          [name]:value,
         list:newlist
        })
    }

    componentDidMount(){     
        var global=this;
        var newlist=this.state.list;
        var news = rowss[this.state.selectedTheme].values;
        rowss[this.state.selectedTheme].map(function(d, index){
          newlist.push({ name:d.Name,value:0,id:index+1})
           global.setState({
                [d.state]:[d.Name],
                list:newlist
            })
        })
        rows.map(function(d, index){
        arr.push(d)
        arrVal[index]=arr;
        valarr.push(index+1)
      })
      news=valarr;
      cardArr=valarr
       rowss[this.state.selectedTheme][0].values=cardArr
 
    }


// //////////

onFieldChange(rowId, field, value) {
  const row = rows.find(({ id }) => id === rowId);
   row[field] = value;
  this.setState({
      rows: [].concat(rows),
      blurCurrentFocus: true
  });
}
onFieldChanges(rowId, field,name, value) {
  const row = rows.find(({ id }) => id === rowId);
  let str=this.state.list[value-1].name
   row[field] = value;
   rows[rowId-1].names=str
  this.setState({
      rows: [].concat(rows),
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
                onChange={this.onFieldChange.bind( this,rows.id, 'ExtractedData')}

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
             
                 onChange={this.onFieldChanges.bind( this,rows.id, 'selectData',this.state.list[rows.id-1])}

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
        const {classes}=this.props;
        return ( 
        <div style={{width:'90%',marginLeft:'5%',height:'calc(100vh - 156px)'}}>
<div style={{height:'45%'}}>
{rowss[1].map(function(d, index){
    return (
      <div >
      <h5 style={{marginLeft:0,color:'#3f51b5',marginTop:10,fontSize:14,fontWeight:'bold'}}>{d.Name}</h5>
      <select style={{marginLeft:0,width:'40%',height:40}} class="form-control" id="exampleFormControlSelect1" 
       onChange={(e)=>{this.handle(e,d.Name,index)}}
      >
              {d.values.map(function(d, index)
              {
                return (
                  <option>{d}</option>                  
                )
              })
              }
            </select>
      </div>
    )
  },this)}
</div>
<div style={{height:'40%',width:'95%',marginTop:0}}>

<Grid 
                columns={this.state.columns}
                rows={this.state.rows}
                getRowKey={row => row.id}
                blurCurrentFocus={this.state.blurCurrentFocus}
                />

</div>
   
          <div style={{height:'10%',width:'95%',marginTop:20}}>

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
  
