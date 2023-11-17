import React , {Component} from 'react';

import Fab from '@material-ui/core/Fab';
import SnippetDialog from '../SnippetDialog/SnippetDialog'



class Theme2 extends Component{

    constructor(props)
    {
        super(props);
        this.state={snippetDialogOpen:false};
    }

    componentDidMount()
    {
        this.setState({html:this.getHtml(this.props.Noc),css:this.getCss(this.props.Noc)});
    }

    getHtml(Noc)
    {  console.log(Noc)
        let string=
`<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<div id="myCarousel" style="width:50%; min-width:300px" class="carousel slide" data-ride="carousel">
    {/* <!-- Indicators --> */}
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>`
      for (let i=2;i<=Noc;i++)
      {  
        string= string + `<li data-target="#myCarousel" data-slide-to="${i}"></li>`
      }
      string=string+
`</ol>

{/* <!-- Wrapper for slides --> */}
<div class="carousel-inner">
<div class="item active">
    <img src={la} alt="Los Angeles" style="width:100%" />
</div>`

        for (let i=2;i<=Noc;i++)
        {  
        string= string + `<div class="item">  <img src={chicago} alt="Chicago" style={{width:'100%'}}/> </div>`
        }


        string = string + `     </div>
    <a class="left carousel-control" href="#myCarousel" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"></span>
        <span class="sr-only">Next</span>
    </a>
</div>`
        return string
    }

    getCss(Noc)
    {
        return "empty";
    }

    handleClose = event => 
    {
        this.setState({snippetDialogOpen:false})
    }

    handleClickOpen = event => 
    {
        this.setState({snippetDialogOpen:true})
    }
    

render(){

    return(
        <div style={{width:"100%" , height:'90%'}}>
            <SnippetDialog open={this.state.snippetDialogOpen} handleClose={this.handleClose} />
            
           
                    <Fab variant="extended" style={{marginRight:'4px',textTransform:'none'}} onClick={this.handleClickOpen}>
                    <span style={{color:'grey'}}> Code Snippet </span>
                    </Fab>
                </div>
                <div>
                    <Fab variant="extended" style={{marginRight:'4px',textTransform:'none'}}>
                    <span style={{color:'grey'}}> Embed Me </span>
                    </Fab>
                </div>
            </div>
        </div>

    )
}

}

export default Theme2;
