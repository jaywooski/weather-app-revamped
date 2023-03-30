import React from 'react'

const VideoBackground = ({ vidSource }) => {
  return (
     <div className="video-backgrd">
		<video autoPlay muted loop >
            <source src={vidSource} type="video/mp4" />
        </video>
    </div>
      
  )
}

export default VideoBackground