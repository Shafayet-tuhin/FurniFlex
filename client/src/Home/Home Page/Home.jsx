import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import one from '../../assets/home/1.jpg';
import two from '../../assets/home/2.jpg';
import three from '../../assets/home/3.jpg';
import four from '../../assets/home/4.jpg';
import five from '../../assets/home/5.jpg';

const Home = () => {
  return (
    <div className="slider-container">
      <Carousel 
        className='flex flex-col items-center justify-center' 
        autoPlay={true} 
        infiniteLoop={true} 
        interval={2500} 
        showThumbs={true} 
        showStatus={true} 
        width="85%" 
        dynamicHeight={true} 
        style={{ maxHeight: '300px', overflow: 'hidden' }} 
      >
          <div>
          <img src={two} alt="Slide 2" />
        </div>
        <div>
          <img src={one} alt="Slide 1" />
        </div>
      
        <div>
          <img src={three} alt="Slide 3" />
        </div>
        <div>
          <img src={four} alt="Slide 4" />
        </div>
        <div>
          <img src={five} alt="Slide 5" />
        </div>
      </Carousel>
    </div>
  );
}

export default Home;
