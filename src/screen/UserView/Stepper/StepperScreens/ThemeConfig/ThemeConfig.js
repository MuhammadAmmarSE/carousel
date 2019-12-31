import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Grid, Input,Select } from 'react-spreadsheet-grid'
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


const styles=(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        height:70
    },
    menuButton: {
        marginRight: theme.spacing(2),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      paper: {
        position: 'absolute',
        width: 400,
        top:'40%',left:'40%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
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

let arr =[];
let valarr=[];
let cardArr= []

class ThemeConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {  
        value:[],
        newvalue:'',
        selectedTheme:this.props.SelectedTheme,
        rows,
        columns: this.initColumns(),
        age:'',
        list:[],
        modalStyle:getModalStyle,
        open:false
        }
    
    }
    
    setOpen=(t)=>{
      this.setState({
        oepn:t
      })
    }
  
     handleOpen = () => {
      this.setState({
        open:true
      });
    };
  
     handleClose = () => {
      this.setState({
        open:false
      });
    };



    handle(e,name,index)
    {
      console.log(name,'name',this.state.list[index])
      
var name = name

let newlist=this.state.list;
console.log(newlist[index].value,e.target.value)
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
        console.log(newlist,'newlist')
      
    }

createComp =() =>{
        const {newvalue}=this.state;
let comp=[];
for(var i=0;i<newvalue;i++){
    comp.push(<p style={{width:200,height:200,backgroundColor:"red"}}></p>);
}

return comp;
    }

   

    componentDidMount(){     
        var global=this;
        var newlist=this.state.list;
        var news = rowss[this.state.selectedTheme].values;
        rowss[this.state.selectedTheme].map(function(d, index){
console.log(index)
          newlist.push({ name:d.Name,value:0,id:index+1})
        
           global.setState({
              
                [d.state]:[d.Name],
                                list:newlist
                
            })
        })
       
        this.props.SelectedData.map(function(d, index){
        arr.push(d)
        arrVal[index]=arr;
        valarr.push(index+1)
      })
      news=valarr;
      cardArr=valarr
       rowss[this.state.selectedTheme][0].values=cardArr
      
      console.log(valarr,'valarr',rowss[this.state.selectedTheme][0].values,"news",news)

         
    }


// //////////

onFieldChange(rowId, field, value) {
  console.log(rowId,field,value,'here')
 

  
  const row = rows.find(({ id }) => id === rowId);
 console.log(row);
   row[field] = value;
   console.log(row,'after update',);
  this.setState({
      rows: [].concat(rows),
      blurCurrentFocus: true
  });
}
onFieldChanges(rowId, field,name, value) {
  console.log(rowId,field,name,value,'here')
  
  const row = rows.find(({ id }) => id === rowId);
 console.log(row);
  let str=this.state.list[value-1].name
   row[field] = value;
   rows[rowId-1].names=str
   console.log(row,'after update',);
   console.log(str,'after update',);
  this.setState({
      rows: [].concat(rows),
      blurCurrentFocus: true
  });
}


arrangeData(){
  return this.state.list[this.props.selectedTheme].value > 0; 
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
        console.log(rows.selectData,'rows.SelectData')
          return (
              <Select  
              items={   this.state.list.filter((lis,i)=>{
               console.log(lis,i,'sdasd'); 
                
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
let data={
  datarowss:rowss[this.state.selectedTheme],
  datarows:rows,
  datalist:this.state.list
}
  this.props.next()
}



    render() { 
        console.log(arrVal,'arrVal')
        const {classes}=this.props;
        return ( <div>
  
  <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.state.open}
        onClose={this.handleClose}
      >
        <div  className={classes.paper}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
      </Modal>



{rowss[this.props.SelectedTheme].map(function(d, index){
    return (
      <div>
      <h5 style={{marginLeft:'-80%',color:'#3f51b5',marginTop:10}}>{d.Name}</h5>
      <select style={{marginLeft:'5%',width:'40%',height:40}} class="form-control" id="exampleFormControlSelect1" 
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



<br /><br /><br /><br />

<Grid 
                columns={this.state.columns}
                rows={this.state.rows}
                getRowKey={row => row.id}
                blurCurrentFocus={this.state.blurCurrentFocus}
            />

    <br />
          <div >

<Button type="submit"
variant="contained" color="primary"  size="large"  style={{float:'left',height:40,width:'10%',borderRadius:20,marginLeft:'2%',marginTop:20}}
onClick={this.props.back}
>
back
</Button>
<Button type="submit"
variant="contained" color="primary"  size="large"  style={{float:'right',height:40,width:'10%',borderRadius:20,marginTop:20}}
onClick={this.Next.bind(this)}
>
next
</Button>
<Button type="submit"
variant="contained" color="primary"  size="large"  style={{float:'right',height:40,marginRight:10,width:'10%',borderRadius:20,marginTop:20}}

onClick={this.handleOpen.bind(this)}
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
  
