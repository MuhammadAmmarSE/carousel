import React , {Component} from 'react';

import Fab from '@material-ui/core/Fab';
import SnippetDialog from '../SnippetDialog/SnippetDialog'



class Theme3 extends Component{

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
        let string=`<div class="my-body"> `
        for (let i=1;i<=Noc;i++)
        {  
            let number="";
            if(i==1)
            {
                number="";
            }
            else number='card'+i;

                 string= string + `<div class="card">
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
                                    </div>
           `
        }
        string = string + ' </div>'
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

export default Theme1;
