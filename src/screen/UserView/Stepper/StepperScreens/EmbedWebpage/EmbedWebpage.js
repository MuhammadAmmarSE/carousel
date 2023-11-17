import React , {Component} from 'react';

import Button from '@material-ui/core/Button';

import Theme1 from './Theme1/Theme1'
import Theme3 from './Theme3/Theme3'
import './EmbedWebpage.css'


class EmbedWebpage extends Component {



    constructor(props)
    {
        super(props);
        this.state={snippetDialogOpen:false,};
    }

    handleNext = (e) => {
        e.preventDefault();
        this.props.next()  
      };

      
  
     getTheme = () =>
     {
         if(this.props.Theme==1)
         {console.log(this.props.Noc);
            return <Theme1 Noc={this.props.Noc}/>
         }
         else if(this.props.Theme==3)
         {  console.log(this.props.Noc);
            return <Theme3 Noc={this.props.Noc}/>
         }
         else return <div></div>
     }

    

    componentDidMount()
    {
     
    }

    render()
    {
        return(
            <div style={{background:'#F7F8FC',width:'100%',height:'calc(100vh - 144px)'}}>

                
                <div style={{width:'90%',marginLeft:'5%',height:'100%'}}>

                    { this.getTheme() }
                   
                    <div style={{background:'',height:'10%',width:'100%',paddingTop:'5px'}}>
                        
                        <Button type="submit"
                        variant="contained" color="primary"  size="large"  style={{float:'right',height:40,width:'10%',borderRadius:20}}
                        onClick={this.handleNext.bind(this)}
                        >
                        Finish
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmbedWebpage;