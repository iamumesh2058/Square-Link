import React from "react";
import Wrapper from "./HowToPlay.style";

const HowToPlay = () => {
  
  return (
    <Wrapper>
      <h3>How to play</h3>

      <div className="container">
        <div className="video">
          <h5 className="video-name">1. Register and login</h5>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/XCC8DcYJOIM?autoplay=1?autoplay=false`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video">
          <h5 className="video-name">2. How to play vs computer</h5>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/5luSsV1TLSM?autoplay=1?autoplay=false`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video">
          <h5 className="video-name">3. How to play vs friends</h5>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/kyvr_f3shGI?autoplay=false"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Wrapper>
  );
};

export default HowToPlay;
