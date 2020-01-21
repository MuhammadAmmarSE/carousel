import React , {Component} from 'react';

import Fab from '@material-ui/core/Fab';
import SnippetDialog from '../SnippetDialog/SnippetDialog'



class Theme1 extends Component{

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
    {  
        let string=`<div class="my-body">`
        for (let i=1;i<=Noc;i++)
        {  
            let number="";
            if(i==1)
            {
                number="";
            }
            else number='card'+i;

                 string= string + 
`   
    <div class="card">
        <div class="card-image ${number}"></div>
        <div class="card-text  ${number}">
            <span class="date">1 week ago</span>
            <h2>Post Two</h2>
            <p>Adipisicing elit. Ducimus, repudiandae corrupti amet temporibus omnis provident illum maxime quod. Lorem ipsum dolor</p>
        </div>
        <div class="card-stats ${number}">
            <div class="stat">
                <div class="value">7<sup>m</sup></div>
                <div class="type">read</div>
            </div>
            <div class="stat border">
                <div class="value">7152</div>
                <div class="type">views</div>
            </div>
            <div class="stat">
                <div class="value">21</div>
                <div class="type">comments</div>
            </div>
        </div>
    </div>`
        }
        string = string + '\n</div>'
        return string
    }

    getCss(Noc)
    {
        let string=`.my-body {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background:url("background.jpg");
            overflow: hidden;
          }
          .card {
            display: grid;
            grid-template-columns: 300px;
            grid-template-rows: 210px 210px 80px;
            grid-template-areas: "image" "text" "stats";
          
            border-radius: 18px;
            background: white;
            box-shadow: 5px 5px 15px rgba(0,0,0,0.9);
            font-family: roboto;
            text-align: center;
            
          
            transition: 0.5s ease;
            cursor: pointer;
            margin:30px;
          }
          
.card-image {
    grid-area: image;
    background: url("img1.jpg");
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-size: cover;
  }
  
  .card-text {
    grid-area: text;
    margin: 25px;
  }
  .card-text .date {
    color: rgb(255, 7, 110);
    font-size:13px;
  }
  .card-text p {
    color: grey;
    font-size:15px;
    font-weight: 300;
  }
  .card-text h2 {
    margin-top:0px;
    font-size:28px;
  }
  .card-stats {
    grid-area: stats; 
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background: rgb(255, 7, 110);
  }
  .card-stats .stat {
    padding:10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
  }
  .card-stats .border {
    border-left: 1px solid rgb(172, 26, 87);
    border-right: 1px solid rgb(172, 26, 87);
  }
  .card-stats .value{
    font-size:22px;
    font-weight: 500;
  }
  .card-stats .value sup{
    font-size:12px;
  }
  .card-stats .type{
    font-size:11px;
    font-weight: 300;
    text-transform: uppercase;
  }
  .card:hover {
    transform: scale(1.15);
    box-shadow: 5px 5px 15px rgba(0,0,0,0.6);
  }`
        for (let i=2;i<=Noc;i++)
        {  
            let number='.card'+i;

            string= string + 
`   
.card-image ${number} {
    background: url("img2.jpg");
    background-size: cover;
  }
  .card-text ${number} .date {
    color: rgb(255, 77, 7);
  }
  .card-stats ${number} .border {
    border-left: 1px solid rgb(185, 67, 20);
    border-right: 1px solid rgb(185, 67, 20);
  }
  .card-stats ${number} {
    background: rgb(255, 77, 7);
  }`
        }
        
        return string
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
            {console.log(this.state.html)}
            <SnippetDialog open={this.state.snippetDialogOpen} handleClose={this.handleClose} html={this.state.html} css={this.state.css} />
            <div className="my-body">
                <div class="card">
                    <div class="card-image "></div>
                    <div class="card-text  ">
                        <span class="date">1 week ago</span>
                        <h2>Example Card</h2>
                        <p>This is the description of Theme 1. The Product description goes here.</p>
                    </div>
                    <div class="card-stats ">
                        <div class="stat">
                            <div class="value">7<sup>m</sup></div>
                            <div class="type">read</div>
                        </div>
                        <div class="stat border">
                            <div class="value">7152</div>
                            <div class="type">views</div>
                        </div>
                        <div class="stat">
                            <div class="value">21</div>
                            <div class="type">comments</div>
                        </div>
                    </div>
                </div>
            <div>
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

export default Theme1;
