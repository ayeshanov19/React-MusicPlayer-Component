import React, { Fragment } from 'react'
import pic from './images/5-The-Chainsmokers.w1200.h630.jpg'
import { Container, Row, Col } from 'react-grid-system';
//import { Container, Row, Col } from 'reactstrap';
import { Progress } from 'reactstrap';
import { faBackward, faPlayCircle, faFastForward, faForward, faPauseCircle, faThumbsUp, faThumbsDown, faAngleDown, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import './Slider.css'
import dont from './images/dont_let_me_down.mp3'
import saathi from './images/saathi.mp3'
import { Slider } from 'material-ui-slider';
import Front from './Front'
import {isEqual} from 'lodash'
import  { getGlobal } from 'reactn';
import  { setGlobal } from 'reactn';
import { noAuto } from '@fortawesome/fontawesome-svg-core';


var im={
    width: "98%",
        height: "93%",
        marginLeft: "1%",
    marginTop: "2%"
}

var R1=
{
    height:"460px"
}

var col1={
    width:"38%"
}

var col2={
    width:"32%"
}
var col3={
    width:"30%"
}



var cent=
{
   fonSize: "9vw",
   // marginLeft: "20%",
    //marginTop: "-9"
    display: "block",
  marginLeft: "auto",
  marginRight: "auto"
}



var R3={
   height:"40px"
}

var R1col2={
    height:"447px"
}


var scol1={
    width:"10%"
}
var scol2={
    width:"76%"
}
var scol3={

marginLeft: "89%",
    marginTop: "-11%"
}
var smallicon={
    // marginTop: "51%",
    // marginRight:"56%",
     fontSize: "3vw",
    // marginLeft: "1%"
    float:"right",
    marginLeft:"auto",
    marginRight:"auto",
    position:"relative"
}

var cont2={
    marginTop:"155%"
}

var angle={
    marginLeft:"1%"
}

var colt={
    marginTop:"2%"
}
var cols={
    marginTop:"2%"
}
var main={
    backgroundColor:"   rgba(255, 0, 0, 0.22) ",
    height:"1087px"
}

var anglesmall={
    marginLeft:"12%",
    fontSize:"4vw"
}

var contsmall={
    backgroundColor:"#e9ecef"
}

var contbig={
    backgroundColor:"lightpink",
    height:"100%"
}




class Player extends  React.Component{
    constructor(props){
        super(props)
        
        this.index=this.props.clickIndex; 
        this.state= {play:true,songProgress:0 ,songPlaying : this.props.songs[this.index],layout:'small' }
        
        
        console.log('songplyain'+this.state.songPlaying)
        //this.audio = new Audio(this.state.songPlaying.song);
        this.audio=new Audio();
        this.interval_ID= null; 
        this.changePlayerMode=this.changePlayerMode.bind(this); 
        this.handleOnChange=this.handleOnChange.bind(this);
        this.changeLayout=this.changeLayout.bind(this);
        this.nextSong=this.nextSong.bind(this);
        //  setGlobal({nextPlay : this.nextSong});
        this.prev=this.prev.bind(this);
       // this.initialLayout=this.initialLayout.bind(this);
        this.setPlayerState = this.setPlayerState.bind(this);
        setGlobal({playerState : this.setPlayerState});
        
    }
    
    
    setSlider(){
    this.setState({songProgress: this.audio.currentTime});
    }

    componentDidMount(){
        console.log('inside did mount player');
    }


    componentDidUpdate(){
        if(this.state.play){
            if(!this.interval_ID){  
                this.interval_ID = setInterval(()=> {this.setState({songProgress: this.audio.currentTime});},1000)
            }
        } 
        if(!this.state.play){
            clearInterval(this.interval_ID);
            this.interval_ID = null;
        } 
    }

    shouldComponentUpdate(nextProps){
        if(nextProps.songs && Array.isArray(nextProps.songs) || (this.setPlayerState) )
        { return true}
        else{
            return false
        }

        
    }

    // METHOD TO SET STATE OF PLAYER
    // PUT THAT METHOD IN GLOBAL

    setPlayerState(songToPlay,index){
        console.log("via global",songToPlay)
        console.log("via index",index)
        setGlobal({ favSongid:parseInt(index)})
        setGlobal({ favSong:songToPlay})
        this.setState({songPlaying:songToPlay[parseInt(index)]},()=>{this.audio.src = this.state.songPlaying.song});
        
    }

    
   
    componentWillReceiveProps(nextProps) {
        console.log("PLAYER PROPS IN COMPONENT WILL RECIEVER NEXT PROPS",nextProps)
        console.log("PLAYER PROPS IN COMPONENT WILL RECIEVER PROPS PROPS",this.props)
     //   if(nextProps.value !== this.props.value) {
          console.log("check ",isEqual(this.props,nextProps))
        if(nextProps.songs && Array.isArray(nextProps.songs) )
        {
            if(!isEqual(this.props,nextProps)){
            console.log("hi......")
            this.setState({songPlaying: nextProps.songs[[nextProps.clickIndex]]},
            function(){
               
                this.audio.src = this.state.songPlaying.song
            }
          );

        }

        }

        
      }


    handleOnChange = (value) => {
        this.audio.currentTime=value;
        console.log('value',value)
        console.log(this.audio.currentTime);  
    
    }

    changePlayerMode(){    
        var currmode = this.state.play;
        this.setState({play:!currmode});
    }


    nextSong(){  
     var favId= getGlobal().favSongid
     var favSongNext= getGlobal().favSong
     console.log('favid',favId)
     console.log('favclick',favSongNext)
      if(this.props.songs){
        this.index = ++this.index;
        if(this.index >=this.props.songs.length){
            this.index=0
        }
        this.setState({songPlaying:this.props.songs[this.index]},
            function(){
                this.audio.src = this.state.songPlaying.song
            }
        )
    }
    
    if(favId||favSongNext)
    {
     favId=++favId
    //  if(favId >=favSongNext.length){
    //     favId=0
    // }
     this.setState({songPlaying:favSongNext[favId]},
            function(){
                this.audio.src = this.state.songPlaying.song
            }
        )
    }
    }


    prev(){
        this.index= --this.index;
        if(this.index==-1){
            this.index=0
        }
        this.setState({songPlaying:this.props.songs[this.index]},function(){this.audio.src = this.state.songPlaying.song})
    }


    changeLayout(){ 
        
        var layoutVal = this.state.layout;
        if(layoutVal == 'small'){
            this.setState({layout:'full'});
        }
        if(layoutVal == 'full'){
            this.setState({layout:'small'});
        }
    }
    

    // initialLayout()
    // {
    //     console.log('smalllll')
    //     this.setState(
    //         {
    //             layout: 'small'
    //         }
    //     )
    // }

    render(){
       console.log('after fav render')
        //  console.log('props'+ this.state.songPlaying.song)
         console.log('PLAYER RENDER',this.state.layout)
        //  if(this.state.songPlaying)
        this.state.play ? this.audio.play() : this.audio.pause();
        var centre;
        if(this.state.play){
            centre= <FontAwesomeIcon icon= {faPauseCircle} onClick={this.changePlayerMode} size="3x" style={cent}/>   
        }
        if(!this.state.play){
            centre= 
            <centre><FontAwesomeIcon icon= {faPlayCircle} onClick={this.changePlayerMode} size="3x" style={cent}/> 
            </centre>
        }
        
        if(this.state.layout == 'full'){
            return(  
                <div style={main}>
                    <div className="container-fluid"   style={contbig} className="footer fixed-bottom"  > 
                        <div className="row" >
                             <div className="col-12" >
                                <FontAwesomeIcon icon= {faAngleDown} size="2x"  
                                style={angle} onClick={this.changeLayout}/>
                            </div>      
                        </div>
                        <div className="row" style={R1}>
                            <div className="col-12 " style={R1col2}>
                            {this.state.songPlaying ?  <img src={ this.state.songPlaying.artist } style={im}
                             />: ' '}
                        
                            </div>
                        </div>
                        <div className="row" >
                            <div className="col-1 " >
                            </div>
                            <div className="col-10">
                            <centre>
                               <h1 style={{textAlign: "center"}}> {this.state.songPlaying ? this.state.songPlaying.text:'' }  </h1>
                               </centre>
                            </div>  
                            <div className="col-1"></div>
                        </div>
                        <div className="row">
                            <div className="col-12" >
                               <Slider onChangeComplete={this.handleOnChange} value ={this.state.songProgress}
                                max={this.audio.duration} className="slider"  />
                           </div>    
                        </div>
                        <div className="row" >
                            <div className="col-4 " >
                               <FontAwesomeIcon icon= {faBackward} size="2x" style={{float:"left"}}
                                   onClick={this.prev}/>
                            </div>
                            <div className="col-4 " >
                            <centre>
                            {centre}
                            </centre>
                                
                            </div>
                            <div className="col-4" >
                                <FontAwesomeIcon icon= {faForward}  size="2x" style={{float:"right"}} onClick={this.nextSong}  />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        if(this.state.layout == 'small')
        {
            var right
            if(this.state.play){
                right= <FontAwesomeIcon icon= {faPause} onClick={this.changePlayerMode} style={smallicon}/>   
            }
            if(!this.state.play){
                right= <FontAwesomeIcon icon= {faPlay} onClick={this.changePlayerMode}  style={smallicon}/> 
            }
            return(     
                <div className="container-fluid" className="footer fixed-bottom" style={contsmall}  >
                     <div className="row">
                         <div className="col-12 ">
                            <Slider style={{touchAction: "none"}}
      onChangeComplete={this.handleOnChange}
                            value ={this.state.songProgress} className="slider" max={this.audio.duration}  />    
                         </div >
                     </div>
                    <div className="row">
                        <div className="col-1" >
                            <FontAwesomeIcon icon= {faAngleDown} style={anglesmall} onClick={this.changeLayout}/>
                        </div>
                        <div className="col-10 " style={scol2}>
                            <marquee behavior="scroll" direction="left" >{this.state.songPlaying ? this.state.songPlaying.text:'' }
                             </marquee>
                        </div> 
                        <div className="col-1  " >      
                            {right}
                        </div>
                    </div>
                </div>
            )
        }    
    }
}
    
export default Player



        