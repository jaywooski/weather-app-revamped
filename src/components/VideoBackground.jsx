import React from 'react'
import video from "../assets/video.mp4"

const VideoBackground = ({ vidSource, setVidSrc }) => {

  /* 
    vidSource = condition state(i.e. sunny, rainy, cloudy, etc..)
    setVidSrc = setCondition() for setting state for video background
  */


  
    
  
  return (
    
    <div className="video-backgrd">
    	<video src={video} autoPlay muted loop />
    </div>
      
  )
}

export default VideoBackground