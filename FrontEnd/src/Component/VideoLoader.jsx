import React from 'react';
import Loader from '../assets/loader.mp4'
const VideoLoader = () => {
  return (
    <div className="video-loader">
      <video autoPlay loop muted className="video-loader__video">
        <source src={Loader} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoLoader;