import React, { useState } from 'react'
import video from "../assets/video.mp4"
import cloud_day from "../assets/clouds_day.mp4"
import { useEffect } from 'react'

const VideoBackground = ({ weather }) => {

  /* 
    vidSource = condition state(i.e. sunny, rainy, cloudy, etc..)
    setVidSrc = setCondition() for setting state for video background
  */


  /* if vidSource (or condition) is "clear" && time is before sunset
        then the source for video should be "clear sky vid" which
        should be some form of state


  */
  // console.log(weather);

  // this is the current condition to make judgement 
  // on type of background playing on app
  // const condition = weather?.current.weather[0].main
  
  // console.log(condition);


  // state for this component
  
    

    
    // switch (condition) {
    //   case "Mist":
        
    //     break;
    
    //   default:
    //     break;
    // }
  
    

  


  return (
    
    <div className="video-backgrd">
    	<video src={cloud_day} autoPlay muted loop />
    </div>
      
  )
}

export default VideoBackground